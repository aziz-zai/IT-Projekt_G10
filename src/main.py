# Unser Service basiert auf Flask
from xmlrpc.client import Boolean
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

from server.bo.EreignisbuchungBo import Ereignisbuchung
from server.bo.GehenBO import Gehen
from server.bo.KommenBO import Kommen

from server.bo.ProjektarbeitBO import Projektarbeit
from server.bo.PauseBO import Pause
from server.bo.ZeitintervallBO import Zeitintervall


from server.bo.ProjectBO import Project
from server.bo.ArbeitszeitkontoBO import Arbeitszeitkonto
# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
#from SecurityDecorator import secured
from SecurityDecorator import secured
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
CORS(app, resources=r'/projectone/*', supports_credentials=True)

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
    'google_user_id': fields.String(attribute='google_user_id', description='nachname eines Benutzers')
})

aktivitäten = api.inherit('Aktivitäten',bo, {
    'bezeichnung': fields.String(attribute='bezeichnung', description='bezeichnung einer Aktivität'),
    'dauer': fields.Float(attribute='dauer', description='bezeichnung der Dauer einer Aktivität'),
    'capacity': fields.Float(attribute='capacity', description='bezeichnung der Kapazität einer Aktivität'),
    'project': fields.Integer(attribute='project', description='Project ID'),
})

projektarbeiten = api.inherit('Projektarbeiten', bo, {
    'start': fields.Integer(attribute='start', description='Start einer Projektarbeit'),
    'ende': fields.Integer(attribute='ende', description='Ende einer Projektarbeit'),
    'bezeichnung': fields.String(attribute='bezeichnung', description='Bezeichnung eines Projektes'),
    'activity': fields.Integer(attribute='activity', description='Aktivitäten ID eines Projektes')
})

pausen = api.inherit('Pausen', bo, {
    'start': fields.Integer(attribute='start', description='Start einer Pause'),
    'ende': fields.Integer(attribute='ende', description='Ende einer Pause'),
    'zeitdifferenz': fields.Float(attribute='zeitdifferenz', description='Zeitdifferenz einer Pause')
})



ereignisbuchungen = api.inherit('Ereignisbuchungen', bo, {
    'arbeitszeitkonto': fields.Integer(attribute='arbeitszeitkonto', description='nbezeichnung eines Arbeitszeitkontos'),
    'project': fields.Float(attribute='capacity', description='bezeichnung der Kapazität einer Aktivität'),

})
 
project = api.inherit('Project',bo, {
    'projektname': fields.String(attribute='projektname', description='projektname'),
    'laufzeit': fields.Integer(attribute='laufzeit', description='laufzeit'),
    'auftraggeber': fields.String(attribute='auftraggeber', description='auftraggeber'),
    'projektleiter': fields.Boolean(attribute='projektleiter', description='projektleiter'),
    'availablehours': fields.Integer(attribute='availablehours', description='availablehours'),
    'user': fields.Integer(attribute='user', description='user'),
})

arbeitszeitkonto = api.inherit('Arbeitszeitkonto',bo, {
    'urlaubstage': fields.Float(attribute='urlaubstage', description='urlaubstage eines Arbeitszeitkontos'),
    'user': fields.Integer(attribute='user', description='user eines Arbeitszeitkontos'),
})

gehen = api.inherit('Gehen', bo, {
    'zeitpunkt': fields.String(attribute='zeitpunkt', description='zeitpunkt eines Gehen-Eintrags'),
})


kommen = api.inherit('Kommen', bo, {
    'zeitpunkt': fields.String(attribute='zeitpunkt', description='zeitpunkt eines Kommen-Eintrags'),
})

abwesenheit = api.inherit('Abwesenheit', bo, {
    'abwesenheitsart': fields.String(attribute='abwesenheit', description='abwesenheit eines Benutzers'),
    'zeitintervallID': fields.String(attribute='zeitintervallID', description='ZeitintervallID eines Benutzers'),
    'bemerkung': fields.String(attribute='bemerkung', description='bemerkung eines Benutzers'),
})

zeitintervallbuchung = api.inherit('Zeitintervallbuchung', bo, {
    'arbeitszeitkonto': fields.Integer(attribute='abwesenheit', description='abwesenheit eines Benutzers'),
    'zeitintervall': fields.String(attribute='zeitintervall', description='ZeitintervallID eines Benutzers'),
    'bemerkung': fields.String(attribute='bemerkung', description='bemerkung eines Benutzers'),
})


@projectone.route('/projektarbeiten')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserListOperations(Resource):

    @projectone.marshal_with(projektarbeiten, code=200)
    @projectone.expect(projektarbeiten)  # Wir erwarten ein Projektarbeit-Objekt von der Client-Seite.
    def post(self):
        """Anlegen eines neuen Projektarbeit-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()
        proposal = Projektarbeit(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            pr = adm.create_projektarbeit(proposal.start, proposal.ende, proposal.bezeichnung, proposal.activity)
            return pr, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/projektarbeiten/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des Projektarbeit-Objekts')
class ProjektarbeitenOperations(Resource):
    @projectone.marshal_with(projektarbeiten)

    def get(self, id):
        """Auslesen eines bestimmten Projektarbeit-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        projektarbeiten = adm.get_projektarbeit_by_id(id)
        return projektarbeiten

    @projectone.marshal_with(projektarbeiten)
    def put(self, id):
        """Update eines bestimmten Projektarbeit-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Projektarbeit-Objekts.
        """
        adm = Administration()
        pa = Projektarbeit(**api.payload)


        if pa is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Projektarbeit-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pa.id = id
            adm.update_projektarbeit(pa)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(projektarbeiten)
    def delete(self, id):
        """Löschen eines bestimmten Projektarbeit-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        pab = adm.get_projektarbeit_by_id(id)
        adm.delete_projektarbeit(pab)
        return '', 200

@projectone.route('/projektarbeiten/<int:activity>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des Projektarbeit-Objekts')
class ProjektarbeitenByActivityIdOperations(Resource):
    @projectone.marshal_with(projektarbeiten)

    def get(self, activity):
        """Auslesen eines bestimmten Projektarbeit-Objekts anhand der Aktivitäten-ID.

        Das auszulesende Objekt wird durch die ```Activity-ID``` in dem URI bestimmt.
        """
        adm = Administration()
        projektarbeitenac = adm.get_projektarbeit_by_activity_id(activity)
        return projektarbeitenac

@projectone.route('/projektarbeit/Gehen/<int:id>/<int:Ak_id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des Projektarbeit-Objekts')
class ProjektarbeitenDetailOperations(Resource):
    @projectone.marshal_with(projektarbeiten)
    def put(self, id, Ak_id):
        """Update eines bestimmten Projektarbeit-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Projektarbeit-Objekts.
        """
        adm = Administration()
        pa = Projektarbeit(**api.payload)


        if pa is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Projektarbeit-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pa.id = id
            adm.update_projektarbeit(pa)
            adm.create_zeitintervallbuchung(pa, Ak_id)
            return '', 200
        else:
            return '', 500



@projectone.route('/pausen')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PausenListOperations(Resource):

    @projectone.marshal_with(pausen, code=200)
    @projectone.expect(pausen)  # Wir erwarten ein Pausen-Objekt von der Client-Seite.
    def post(self):
        """Anlegen eines neuen Pausen-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Pause(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            pa = adm.create_pause(proposal.start, proposal.ende, proposal.zeitdifferenz)
            return pa, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/pausen/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des Pausen-Objekts')

class PausenOperations(Resource):
    @projectone.marshal_with(pausen)

    def get(self, id):
        """Auslesen eines bestimmten Pausen-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        pausen = adm.get_pause_by_id(id)
        return pausen

    @projectone.marshal_with(pausen)
    def put(self, id):
        """Update eines bestimmten Pausen-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Projektarbeit-Objekts.
        """
        adm = Administration()
        pau = Pause(**api.payload)


        if pau is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Pausen-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pau.id = id
            adm.update_pause(pau)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(pausen)
    def delete(self, id):
        """Löschen eines bestimmten Pausen-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        pu = adm.get_pause_by_id(id)
        adm.delete_pause(pu)
        return '', 200



@projectone.route('/project')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):

    @projectone.marshal_with(project, code=200)
    @projectone.expect(project)  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self):
        """Anlegen eines neuen Customer-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Project(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            a = adm.create_project(proposal.projektname, proposal.laufzeit, proposal.auftraggeber, proposal.projektleiter, proposal.availablehours, proposal.user)
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/project/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectListOperations(Resource):
    @projectone.marshal_with(project)
    def get(self, id):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        project = adm.get_project_by_id(id)
        return project

    @projectone.marshal_with(project)
    def put(self, id):
        """Update eines bestimmten aktivitäten-Objekts."""
        adm = Administration()
        pr = Aktivitäten(**api.payload)


        if pr is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pr.id = id
            adm.update_project(pr)
            return '', 200
        else:
            return '', 500

    
    @projectone.marshal_with(project)
    def delete(self, id):
        """Löschen eines bestimmten User-Objekts."""
        adm = Administration()

        project = adm.get_project_by_id(id)
        adm.delete_project(project)
        return '', 200


@projectone.route('/aktivitäten')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AktivitätenListOperations(Resource):

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
        akt = Administration()
        aktivitäten = akt.get_aktivitäten_by_id(id)
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

@projectone.route('/aktivitäten/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AktivitätenListOperations(Resource):
    @projectone.marshal_list_with(aktivitäten)
    def get(self, id):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = Administration()
        aktivitäten = adm.get_aktivitäten_by_id(id)
        return aktivitäten

    @projectone.marshal_with(aktivitäten)
    def put(self, id):
        """Update eines bestimmten aktivitäten-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        up = Aktivitäten(**api.payload)


        if up is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            up.id = id
            adm.update_aktivitäten(up)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(aktivitäten)
    def delete(self, id):
        """Löschen eines bestimmten User-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        aktivitätend = adm.get_aktivitäten_by_id(id)
        adm.delete_aktivitäten(aktivitätend)
        return '', 200


@projectone.route('/users')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserListOperations(Resource):
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
            Administration.create_arbeitszeitkonto(self, urlaubstage=0, user=u.id)
            return u, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

@projectone.route('/users/<int:id>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @projectone.marshal_with(user)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Customer-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        user = adm.get_user_by_id(id)
        return user
    

    @projectone.marshal_with(user)
    def delete(self, id):
        """Löschen eines bestimmten User-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        userd = adm.get_user_by_id(id)
        adm.delete_user(userd)
        return '', 200


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
    
    @projectone.marshal_with(user)
    @projectone.expect(user)
    def put(self, google_user_id):
        """Update eines bestimmten User-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        up = User(**api.payload)
        up.google_user_id = google_user_id
        adm.update_user(up)
        return up


@projectone.route('/arbeitszeitkonto/<int:user>')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectone.param('user', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @projectone.marshal_with(arbeitszeitkonto)

    def get(self, user):
        """Auslesen eines bestimmten Arbeitszeit-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        arb = adm.get_arbeitszeitkonto_by_id(user)
        return arb
    
    @projectone.marshal_with(arbeitszeitkonto, code=200)
    @projectone.expect(arbeitszeitkonto)  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self, user):

        adm = Administration()

        proposal = Arbeitszeitkonto(**api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:
            """ Wir verwenden lediglich Vor- und Nachnamen des Proposals für die Erzeugung
            eines User-Objekts. Das serverseitig erzeugte Objekt ist das maßgebliche und 
            wird auch dem Client zurückgegeben. 
            """
            ab = adm.create_arbeitszeitkonto(proposal.urlaubstage, user)
            return ab, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return '', 500

    def put(self, user):
        """Update eines bestimmten User-Objekts.

        **ACHTUNG:** Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        Customer-Objekts.
        """
        adm = Administration()
        up = Arbeitszeitkonto(**api.payload)


        if up is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            up.user = user
            adm.update_arbeitszeitkonto(up)
            return '', 200
        else:
            return '', 500

    @projectone.marshal_with(user)
    def delete(self, user):
        """Löschen eines bestimmten User-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        userd = adm.get_arbeitszeitkonto_by_id(user)
        adm.delete_user(userd)
        return '', 200


@projectone.route('/ereignisbuchungen')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class EreignisbuchungenListOperations(Resource):

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
            e = adm.create_ereignisbuchung(proposal.arbeitszeitkonto, proposal.ereignis)
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

    @projectone.marshal_with(gehen, code=200)
    def post(self):
        """Anlegen eines neuen Gehen-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
        adm = Administration()

        proposal = Gehen(zeitpunkt=datetime.now())

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

        proposal = Kommen(zeitpunkt=datetime.now())

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

@projectone.route('/zeitintervallbuchung')
@projectone.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ZeitintervallbuchungListOperations(Resource):

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


        if up is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            up.google_user_id = google_user_id
            adm.update_user(up)
            return '', 200
        else:
            return '', 500

if __name__ == '__main__':
    app.run(debug=True)