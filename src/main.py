# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS
from server.bo.AktivitätenBO import Aktivitäten
from server.bo.AbwesenheitBO import Abwesenheit

# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from server.Administration import Administration
from server.bo.UserBO import User
# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
#from SecurityDecorator import secured
from datetime import datetime

from server.bo.ZeitintervallbuchungBO import Zeitintervallbuchung
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

aktivitäten = api.inherit('Aktivitäten',bo, {
    'bezeichnung': fields.String(attribute='bezeichnung', description='bezeichnung einer Aktivität'),
    'dauer': fields.Float(attribute='dauer', description='bezeichnung der Dauer einer Aktivität'),
    'capacity': fields.Float(attribute='capacity', description='bezeichnung der Kapazität einer Aktivität'),
})

abwesenheit = api.inherit('Abwesenheit', bo, {
    'abwesenheitsart': fields.String(attribute='abwesenheit', description='abwesenheit eines Benutzers'),
    'zeitintervallID': fields.String(attribute='zeitintervallID', description='ZeitintervallID eines Benutzers'),
    'bemerkung': fields.String(attribute='bemerkung', description='bemerkung eines Benutzers'),




@projectone.route('/aktivitäten')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AktivitätenListOperations(Resource):
    @projectone.marshal_list_with(aktivitäten)
    def get(self):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        aktivitäten = adm.get_all_aktivitäten()
        return aktivitäten

    @projectone.marshal_with(aktivitäten, code=200)
    @projectone.expect(aktivitäten)  # Wir erwarten ein User-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Aktivitäten-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Aktivitäten(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            a = adm.create_aktivitäten(proposal.bezeichnung, proposal.dauer, proposal.capacity, proposal.project)
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/aktivitäten/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des User-Objekts')
class AktivitätenOperations(Resource):
    @projectone.marshal_with(aktivitäten)

    def get(self, id):
        """Auslesen eines bestimmten Aktivitäten-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        aktivitäten = adm.get_aktivitäten_by_id(id)
        return aktivitäten

    @projectone.marshal_with(aktivitäten)
    def put(self, id):
        """Update eines bestimmten AKtivitäten-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        ak = Aktivitäten(**api.payload)


        if ak is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ak.id = id
            adm.update_aktivitäten(ak)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(aktivitäten)
    def delete(self, id):
        """Löschen eines bestimmten Aktivitäten-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        aktd = adm.get_aktivitäten_by_id(id)
        adm.delete_aktivitäten(aktd)
        return '', 200


@projectone.route('/users')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserListOperations(Resource):
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

@projectone.route('/users/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @projectone.marshal_with(user)

    def get(self, id):
        """Auslesen eines bestimmten Customer-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        user = adm.get_user_by_id(id)
        return user

    @projectone.marshal_with(user)
    def put(self, id):
        """Update eines bestimmten User-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        up = User(**api.payload)


        if up is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            up.id = id
            adm.update_user(up)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(user)
    def delete(self, id):
        """Löschen eines bestimmten User-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        userd = adm.get_user_by_id(id)
        adm.delete_user(userd)
        return '', 200

@projectone.route('/users-by-nachname/<string:nachname>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('nachname', 'Der Nachname des Users')
class UsersByNameOperations(Resource):
    @projectone.marshal_with(user)

    def get(self, nachname):
        """ Auslesen von Customer-Objekten, die durch den Nachnamen bestimmt werden.

        Die auszulesenden Objekte werden durch ```lastname``` in dem URI bestimmt.
        """
        adm = Administration()
        usern = adm.get_user_by_name(nachname)
        return usern
@projectone.route('/users-by-gid/<string:google_user_id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('google_user_id', 'Die G-ID des User-Objekts')
class UserByGoogleUserIdOperations(Resource):
    @projectone.marshal_with(user)

    def get(self, google_user_id):
        """Auslesen eines bestimmten Customer-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        userg = adm.get_user_by_google_user_id(google_user_id)
        return userg


        @projectone.route('/abwesenheit')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AbwesenheitListOperations(Resource):
    @projectone.marshal_list_with(Abwesenheit)
    def get(self):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        abwesenheit = adm.get_all_abwesenheit()
        return abwesenheit

    @projectone.marshal_with(abwesenheit, code=200)
    @projectone.expect(abwesenheit)  # Wir erwarten ein User-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Aktivitäten-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Abwesenheit (**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            a = adm.create_abwesenheit (proposal.abwesenheitart, proposal.zeitintervallID, proposal.bemerkung)
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/abwesenheit/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des User-Objekts')
class AbwesenheitOperations(Resource):
    @projectone.marshal_with(abwesenheit)

    def get(self, id):
        """Auslesen eines bestimmten Abwesenheit-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        abwesenheit = adm.get_abwesenheit_by_id(id)
        return abwesenheit

    @projectone.marshal_with(abwesenheit)
    def put(self, id):
        """Update eines bestimmten Abwesenheit-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        ab = Abwesenheit(**api.payload)


        if ab is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ab.id = id
            adm.update_abwesenheit(ab)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(abwesenheit)
    def delete(self, id):
        """Löschen eines bestimmten Abwesenheit-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        abtd = adm.get_abwesenheit_by_id(id)
        adm.delete_abwesenheit(abtd)
        return '', 200

@projectone.route('/users-by-bemerkung/<float:bemerkung>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('bemerkung', 'Die Bemerkung des Users')
class UsersByBemerkungOperations(Resource):
    @projectone.marshal_with(abwesenheit)

    def get(self, bemerkung):
        """ Auslesen von Customer-Objekten, die durch die Bemerkung bestimmt werden.

        Die auszulesenden Objekte werden durch ```Bemerkung``` in dem URI bestimmt.
        """
        adm = Administration()
        abwesenheitn = adm.get_user_by_bemerkung(bemerkung)
        return abwesenheitn


@projectone.route('/zeitintervallbuchung')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ZeitintervallbuchungListOperations(Resource):
    @projectone.marshal_list_with(zeitintervallbuchung)
    def get(self):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        zeitintervallbuchung = adm.get_all_zeitintervallbuchung()
        return zeitintervallbuchung

    @projectone.marshal_with(zeitintervallbuchung, code=200)
    @projectone.expect(zeitintervallbuchung)  # Wir erwarten ein User-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Zeitintervallbuchung-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Zeitintervallbuchung (**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            a = adm.create_abwesenheit (proposal.buchung, proposal.arbeitszeitkonto)
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/zeitintervallbuchung/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des User-Objekts')
class ZeitintervallbuchungOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung)

    def get(self, id):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        zeitintervallbuchung = adm.get_zeitintervallbuchung_by_id(id)
        return zeitintervallbuchung

    @projectone.marshal_with(zeitintervallbuchung)
    def put(self, id):
        """Update eines bestimmten Zeitintervallbuchung-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        ze = Zeitintervallbuchung(**api.payload)


        if ze is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ze.id = id
            adm.update_zeitinterballbuchung(ze)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(zeitintervallbuchung)
    def delete(self, id):
        """Löschen eines bestimmten Zeitintervallbuchung-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        zetd = adm.get_zeitintervallbuchung_by_id(id)
        adm.delete_zeitintervallbuchung(zetd)
        return '', 200

if __name__ == '__main__':
    app.run(debug=True)