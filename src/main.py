# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from server.Administration import Administration
from server.bo.UserBO import User
# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
#from SecurityDecorator import secured

"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""
app = Flask(__name__)

"""
Alle Ressourcen mit dem Präfix /bank für **Cross-Origin Resource Sharing** (CORS) freigeben.
Diese eine Zeile setzt die Installation des Package flask-cors voraus. 

Sofern Frontend und Backend auf getrennte Domains/Rechnern deployed würden, wäre sogar eine Formulierung
wie etwa diese erforderlich:
CORS(app, resources={r"/bank/*": {"origins": "*"}})
Allerdings würde dies dann eine Missbrauch Tür und Tor öffnen, so dass es ratsamer wäre, nicht alle
"origins" zuzulassen, sondern diese explizit zu nennen. Weitere Infos siehe Doku zum Package flask-cors.
"""
CORS(app, resources=r'/projectone/*')

"""
In dem folgenden Abschnitt bauen wir ein Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx.
"""
api = Api(app, version='1.0', title='Project_One_API',
    description='Project_One ist unser IT Projekt')

"""Anlegen eines Namespace

Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
Bank-relevanten Operationen unter dem Präfix /bank zusammen. Eine alternative bzw. ergänzende Nutzung
von Namespace könnte etwa sein, unterschiedliche API-Version voneinander zu trennen, um etwa 
Abwärtskompatibilität (vgl. Lehrveranstaltungen zu Software Engineering) zu gewährleisten. Dies ließe
sich z.B. umsetzen durch /bank/v1, /bank/v2 usw."""
projectone = api.namespace('projectone', description='Funktionen des Projectone')

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Customer, Account und Transaction aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
    'timestamp': fields.String(attribute='timestamp', description='Der Unique Identifier eines Business Object'),
})

"""User ist ein BusinessObject"""
user = api.inherit('User', bo, {
    'vorname': fields.String(attribute='vorname', description='vorname eines Benutzers'),
    'nachname': fields.String(attribute='nachname', description='nachname eines Benutzers'),
    'benutzername': fields.String(attribute='benutzername', description='nachname eines Benutzers'),
    'email': fields.String(attribute='email', description='nachname eines Benutzers'),
    'google_user_id': fields.String(attribute='google_user_id', description='nachname eines Benutzers'),
})



@projectone.route('/users')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class CustomerListOperations(Resource):
    @projectone.marshal_list_with(user)
    def get(self):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        user = adm.get_all_user()
        return user

    @projectone.marshal_with(user, code=200)
    @projectone.expect(user)  # Wir erwarten ein User-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Customer-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = User(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            u = adm.create_user(proposal.vorname, proposal.nachname, proposal.benutzername, proposal.email, proposal.google_user_id)
            return u, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

if __name__ == '__main__':
    app.run(debug=True)