# Unser Service basiert auf Flask
from flask import Flask
# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS
from server.bo.AktivitätenBO import Aktivitäten

# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from server.Administration import Administration
from server.bo.UserBO import User
from server.bo.EreignisbuchungBO import Ereignisbuchung
from server.bo.GehenBO import Gehen
from server.bo.KommenBO import Kommen

# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
#from SecurityDecorator import secured
from datetime import datetime
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


ereignisbuchungen = api.inherit('Ereignisbuchungen', bo, {
    'buchung': fields.Integer(attribute='buchung', description='bezeichnung einer Buchung eines Ereignisses'),
    'arbeitszeitkonto': fields.Integer(attribute='arbeitszeitkonto', description='nbezeichnung eines Arbeitszeitkontos'),
})


gehen = api.inherit('Gehen', bo, {
    'zeitpunkt': fields.DateTime(attribute='zeitpunkt', description='zeitpunkt eines Gehen-Eintrags'),
})


kommen = api.inherit('Kommen', bo, {
    'zeitpunkt': fields.DateTime(attribute='zeitpunkt', description='zeitpunkt eines Kommen-Eintrags'),
})



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




@projectone.route('/ereignisbuchungen')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class EreignisbuchungenListOperations(Resource):
    @projectone.marshal_list_with(ereignisbuchungen)
    def get(self):
        """Auslesen aller Ereignisbuchungen-Objekte.

        Sollten keine Ereignisbuchungen-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        ereignisbuchungen = adm.get_all_ereignisbuchung()
        return ereignisbuchungen

    @projectone.marshal_with(ereignisbuchungen, code=200)
    @projectone.expect(ereignisbuchungen)  # Wir erwarten ein Ereignisbuchungen-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Ereignisbuchung-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Ereignisbuchung(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            e = adm.create_ereignisbuchung(proposal.buchung, proposal.arbeitszeitkonto)
            return e, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/ereignisbuchungen/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des Ereignisbuchung-Objekts')
class EreignisbuchungenOperations(Resource):
    @projectone.marshal_with(ereignisbuchungen)

    def get(self, id):
        """Auslesen eines bestimmten Ereignisbuchung-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        ereignisbuchungen = adm.get_ereignisbuchung_by_id(id)
        return ereignisbuchungen

    @projectone.marshal_with(ereignisbuchungen)
    def put(self, id):
        """Update eines bestimmten Ereignisbuchung-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        er = Ereignisbuchung(**api.payload)


        if er is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            er.id = id
            adm.update_ereignisbuchung(er)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(ereignisbuchungen)
    def delete(self, id):
        """Löschen eines bestimmten Ereignisbuchung-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        ergd = adm.get_ereignisbuchung_by_id(id)
        adm.delete_ereignisbuchung(ergd)
        return '', 200



@projectone.route('/gehen')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class GehenListOperations(Resource):
    @projectone.marshal_list_with(gehen)
    def get(self):
        """Auslesen aller Gehen-Objekte.

        Sollten keine Gehen-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        gehen = adm.get_all_gehen()
        return gehen

    @projectone.marshal_with(gehen, code=200)
    @projectone.expect(gehen)  # Wir erwarten ein Gehen-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Gehen-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Gehen(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            g = adm.create_gehen(proposal.zeitpunkt)
            return g, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/gehen/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des Gehen-Objekts')
class GehenOperations(Resource):
    @projectone.marshal_with(gehen)

    def get(self, id):
        """Auslesen eines bestimmten Gehen-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        gehen = adm.get_gehen_by_id(id)
        return gehen

    @projectone.marshal_with(gehen)
    def put(self, id):
        """Update eines bestimmten Gehen-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        ge = Gehen(**api.payload)


        if ge is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ge.id = id
            adm.update_gehen(ge)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(gehen)
    def delete(self, id):
        """Löschen eines bestimmten Gehen-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        gehend = adm.get_gehen_by_id(id)
        adm.delete_gehen(gehend)
        return '', 200




@projectone.route('/kommen')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class KommenListOperations(Resource):
    @projectone.marshal_list_with(kommen)
    def get(self):
        """Auslesen aller Kommen-Objekte.

        Sollten keine Kommen-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        kommen = adm.get_all_kommen()
        return kommen

    @projectone.marshal_with(kommen, code=200)
    @projectone.expect(kommen)  # Wir erwarten ein Kommen-Objekt von Client-Seite.

    def post(self):
        """Anlegen eines neuen Kommen-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Kommen(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            k = adm.create_kommen(proposal.zeitpunkt)
            return k, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/kommen/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des Kommen-Objekts')
class GehenOperations(Resource):
    @projectone.marshal_with(kommen)

    def get(self, id):
        """Auslesen eines bestimmten Kommen-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        kommen = adm.get_kommen_by_id(id)
        return kommen

    @projectone.marshal_with(kommen)
    def put(self, id):
        """Update eines bestimmten Kommen-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        ko = Kommen(**api.payload)


        if ko is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ko.id = id
            adm.update_kommen(ko)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(kommen)
    def delete(self, id):
        """Löschen eines bestimmten Kommen-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        komd = adm.get_kommen_by_id(id)
        adm.delete_kommen(komd)
        return '', 200


if __name__ == '__main__':
    app.run(debug=True)