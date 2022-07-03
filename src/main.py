# Unser Service basiert auf Flask
from flask import Flask

# Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields

# Wir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
from server.Administration import Administration
from server.bo.UserBO import User
from server.bo.AktivitätenBO import Aktivitäten
from server.bo.AbwesenheitBO import Abwesenheit
from server.bo.MembershipBO import Membership
from server.bo.EreignisbuchungBo import Ereignisbuchung
from server.bo.GehenBO import Gehen
from server.bo.KommenBO import Kommen
from server.bo.EreignisBO import Ereignis
from server.bo.ProjektarbeitBO import Projektarbeit
from server.bo.PauseBO import Pause
from server.bo.ZeitintervallBO import Zeitintervall
from server.bo.ProjectBO import Project
from server.bo.ArbeitszeitkontoBO import Arbeitszeitkonto
from server.bo.ZeitintervallbuchungBO import Zeitintervallbuchung
from server.bo.AbwesenheitBO import Abwesenheit

from datetime import datetime

# Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
# from SecurityDecorator import secured
from SecurityDecorator import secured


"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""
app = Flask(__name__)

"""
Alle Ressourcen mit dem Präfix /projectone für **Cross-Origin Resource Sharing** (CORS) freigeben.
Diese eine Zeile setzt die Installation des Package flask-cors voraus. 
"""
CORS(app, resources=r"/projectone/*", supports_credentials=True)

"""
In dem folgenden Abschnitt bauen wir ein Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx. 
"""
api = Api(
    app,
    version="1.0",
    title="Project_One_API",
    description="Project_One ist unser IT Projekt",
)

"""Anlegen eines Namespace
Der Namespace erlaubt die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
Projectone-relevanten Operationen unter dem Präfix /projectone zusammen.
"""
projectone = api.namespace("projectone", description="Funktionen des Projectone")

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.
BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Customer, Account und Transaction aufsetzen."""
bo = api.model(
    "BusinessObject",
    {
        "id": fields.Integer(
            attribute="_id", description="Der Unique Identifier eines Business Object"
        ),
        "timestamp": fields.String(
            attribute="_timestamp",
            description="Der Unique Identifier eines Business Object",
        ),
    },
)

""" SECTION Marshalling
"""
"""ANCHOR User Marshalling
"""
user = api.inherit(
    "User",
    bo,
    {
        "vorname": fields.String(
            attribute="_vorname", description="vorname eines Benutzers"
        ),
        "nachname": fields.String(
            attribute="_nachname", description="nachname eines Benutzers"
        ),
        "benutzername": fields.String(
            attribute="_benutzername", description="nachname eines Benutzers"
        ),
        "email": fields.String(
            attribute="_email", description="nachname eines Benutzers"
        ),
        "google_user_id": fields.String(
            attribute="_google_user_id", description="nachname eines Benutzers"
        ),
        "urlaubstage": fields.Integer(
            attribute="_urlaubstage", description="nachname eines Benutzers"
        ),
    },
)
"""ANCHOR Aktivitäten Marshalling
"""
aktivitäten = api.inherit(
    "Aktivitäten",
    bo,
    {
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="bezeichnung einer Aktivität"
        ),
        "dauer": fields.Float(
            attribute="_dauer", description="bezeichnung der Dauer einer Aktivität"
        ),
        "capacity": fields.Float(
            attribute="_capacity",
            description="bezeichnung der Kapazität einer Aktivität",
        ),
        "project": fields.Integer(attribute="_project", description="Project ID"),
    },
)
"""ANCHOR Zeitintervall Marshalling
"""
zeitintervall = api.inherit(
    "Zeitintervall",
    bo,
    {
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="Bezeichnung eines Projektes"
        ),
        "start": fields.Integer(
            attribute="_start", description="Start einer Projektarbeit"
        ),
        "ende": fields.Integer(
            attribute="_ende", description="Ende einer Projektarbeit"
        ),
    },
)
"""ANCHOR Projektarbeiten Marshalling
"""
projektarbeiten = api.inherit(
    "Projektarbeiten",
    zeitintervall,
    {
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="Bezeichnung eines Projektes"
        ),
        "beschreibung": fields.String(
            attribute="_beschreibung", description="Beschreibung eines Projektes"
        ),
        "start": fields.Integer(
            attribute="_start", description="Start einer Projektarbeit"
        ),
        "ende": fields.Integer(
            attribute="_ende", description="Ende einer Projektarbeit"
        ),
        "activity": fields.Integer(
            attribute="_activity", description="Aktivitäten ID eines Projektes"
        ),
    },
)
"""ANCHOR Pausen Marshalling
"""
pausen = api.inherit(
    "Pausen",
    bo,
    {
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="Bezeichnung einer Pause"
        ),
        "start": fields.Integer(attribute="_start", description="Start einer Pause"),
        "ende": fields.Integer(attribute="_ende", description="Ende einer Pause"),
    },
)
"""ANCHOR Membership Marshalling
"""
membership = api.inherit(
    "Membership",
    bo,
    {
        "user": fields.Integer(
            attribute="_user", description="User_id des Memberships"
        ),
        "project": fields.Integer(
            attribute="_project", description="project_id des Memberships"
        ),
        "projektleiter": fields.Boolean(
            attribute="_projektleiter", description="Projektleiter eines Memberships"
        ),
    },
)
"""ANCHOR Buchung Marshalling
"""
buchung = api.inherit(
    "Buchung",
    bo,
    {
        "erstellt_von": fields.Integer(
            attribute="_erstellt_von", description="bezeichnung Ersteller"
        ),
        "erstellt_für": fields.Integer(
            attribute="_erstellt_für", describtion="bezeichnung Empfänger"
        ),
        "ist_buchung": fields.Boolean(
            attribute="_ist_buchung", describtion="bezeichnung der Ist-Buchung"
        ),
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="Bezeichnung der Ereignisbuchung"
        ),
    },
)
"""ANCHOR Ereignisbuchung Marshalling
"""
ereignisbuchungen = api.inherit(
    "Ereignisbuchungen",
    buchung,
    {
        "ereignis": fields.Integer(
            attribute="_ereignis", describtion="bezeichnung vom Ereignis"
        ),
    },
)
"""ANCHOR Project Marshalling
"""
project = api.inherit(
    "Project",
    bo,
    {
        "projektname": fields.String(
            attribute="_projektname", description="projektname"
        ),
        "laufzeit": fields.Integer(attribute="_laufzeit", description="laufzeit"),
        "auftraggeber": fields.String(
            attribute="_auftraggeber", description="auftraggeber"
        ),
        "availablehours": fields.Float(
            attribute="_availablehours", description="availablehours"
        ),
    },
)
"""ANCHOR Ereignis Marshalling
"""
ereignis = api.inherit(
    "Ereignis",
    bo,
    {
        "zeitpunkt": fields.String(
            attribute="_zeitpunkt", description="zeitpunkt eines Ereignisses"
        ),
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="bezeichnung eines Ereignis-Eintrags"
        ),
    },
)
"""ANCHOR Arbeitszeitkonto Marshalling
"""
arbeitszeitkonto = api.inherit(
    "Arbeitszeitkonto",
    bo,
    {
        "urlaubskonto": fields.Float(
            attribute="_urlaubskonto",
            description="urlaubskonto eines Arbeitszeitkontos",
        ),
        "user": fields.Integer(
            attribute="_user", description="user eines Arbeitszeitkontos"
        ),
        "gleitzeit": fields.Float(
            attribute="_gleitzeit", description="gleitzeit eines Arbeitszeitkontos"
        ),
        "arbeitsleistung": fields.Float(
            attribute="_arbeitsleistung",
            description="arbeitsleistung eines Arbeitszeitkontos",
        ),
    },
)
"""ANCHOR Gehen Marshalling
"""
gehen = api.inherit(
    "Gehen",
    ereignis,
    {
        "zeitpunkt": fields.String(
            attribute="_zeitpunkt", description="zeitpunkt eines Gehen-Eintrags"
        ),
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="bezeichnung eines Gehen-Eintrags"
        ),
    },
)
"""ANCHOR Kommen Marshalling
"""
kommen = api.inherit(
    "Kommen",
    ereignis,
    {
        "zeitpunkt": fields.String(
            attribute="_zeitpunkt", description="zeitpunkt eines Kommen-Eintrags"
        ),
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="bezeichnung eines Kommen-Eintrags"
        ),
    },
)
"""ANCHOR Abwesenheit Marshalling
"""
abwesenheit = api.inherit(
    "Abwesenheit",
    bo,
    {
        "abwesenheitsart": fields.Integer(
            attribute="_abwesenheitsart", description="abwesenheit eines Benutzers"
        ),
        "start": fields.Integer(
            attribute="_start", description="ZeitintervallID eines Benutzers"
        ),
        "ende": fields.Integer(
            attribute="_ende", description="bemerkung eines Benutzers"
        ),
        "bezeichnung": fields.String(
            attribute="_bezeichnung", description="bezeichnung eines Ereignis-Eintrags"
        ),
    },
)
"""ANCHOR Zeitintervallbuchung Marshalling
"""
zeitintervallbuchung = api.inherit(
    "Zeitintervallbuchung",
    buchung,
    {
        "zeitdifferenz": fields.String(
            attribute="_zeitdifferenz", description="abwesenheit eines Benutzers"
        ),
        "zeitintervall": fields.String(
            attribute="_zeitintervall", description="abwesenheit eines Benutzers"
        ),
    },
)

""" !SECTION 
"""
""" SECTION Views 
"""
"""ANCHOR Membership Views
"""


@projectone.route("/membership")
@projectone.response(500, "Falls es zu einem Server-seitigem Fehler kommt.")
class MembershipOperations(Resource):
    @projectone.marshal_with(membership, code=200)
    @projectone.expect(
        membership
    )  # Wir erwarten ein Membership-Objekt von der Client-Seite.
    def post(self):
        """Anlegen eines neuen Membership-Objekts."""
        adm = Administration()
        proposal = Membership.from_dict(api.payload)
        if proposal is not None:
            m = adm.create_membership(
                proposal.get_user(),
                proposal.get_project(),
                proposal.get_projektleiter(),
            )
            return m, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/membership/<int:user>/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Membership-Objekts")
class MembershipByIDOperations(Resource):
    @projectone.marshal_with(membership)
    def get(self, user, project):
        """Auslesen eines bestimmten Membership-Objekts.

        Das auszulesende Objekt wird durch die ```user``` in dem URI bestimmt.
        """
        adm = Administration()
        membership = adm.get_membership_by_user_and_project(user, project)
        return membership

    @projectone.marshal_with(membership)
    def delete(self, user, project):
        """Löschen eines bestimmten Membership-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        mbs = adm.get_membership_by_user_and_project(user, project)
        adm.delete_membership(mbs)
        return "", 200


@projectone.route("/membership/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Membership-Objekts")
class MembershipByIDOperations(Resource):
    @projectone.marshal_with(membership)
    def put(self, id):

        adm = Administration()
        ms = Membership.from_dict(api.payload)

        if ms is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Membership-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ms.set_id(id)
            me = adm.update_membership(ms)
            return me, 200
        else:
            return "", 500


@projectone.route("/members-by-project/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Membership-Objekts")
class MembershipByProjectOperations(Resource):
    @projectone.marshal_with(user)
    def get(self, project):
        """Auslesen eines bestimmten Membership-Objekts nach Projektid
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        membership = adm.get_members_by_project(project)
        return membership


@projectone.route("/projektleiter-by-project/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Membership-Objekts")
class MembershipByProjectOperations(Resource):
    @projectone.marshal_with(user)
    def get(self, project):
        """Auslesen eines bestimmten Membership-Objekts nach Projektid
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        membership = adm.get_projektleiter_by_project(project)
        return membership


@projectone.route("/membership-by-user-and-project/<int:user>/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Membership-Objekts")
class MembershipByUserAndProject(Resource):
    @projectone.marshal_with(membership)
    def get(self, user, project):
        """Auslesen eines bestimmten Membership-Objekts nach Projektid
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        membership = adm.get_membership_by_user_and_project(user, project)
        return membership


@projectone.route("/membership-by-user/<int:user>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Membership-Objekts")
class MembershipByUserOperations(Resource):
    @projectone.marshal_with(project)
    def get(self, user):
        adm = Administration()
        mu = adm.get_membership_by_user(user)
        return mu


"""ANCHOR Projektarbeit Views
"""


@projectone.route("/projektarbeiten")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ProjektarbeitListOperations(Resource):
    @projectone.marshal_with(projektarbeiten, code=200)
    @projectone.expect(
        projektarbeiten
    )  # Wir erwarten ein Projektarbeit-Objekt von der Client-Seite.
    def post(self):
        """Anlegen eines neuen Projektarbeit-Objekts."""
        adm = Administration()
        proposal = Projektarbeit.from_dict(api.payload)

        if proposal is not None:

            pr = adm.create_projektarbeit(
                proposal.get_bezeichnung(),
                proposal.get_beschreibung(),
                proposal.get_start(),
                proposal.get_ende(),
                proposal.get_activity(),
            )
            return pr, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/projektarbeiten/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Projektarbeit-Objekts")
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

        adm = Administration()
        pa = Projektarbeit.from_dict(api.payload)

        if pa is not None:
            pa.set_id(id)
            proja = adm.update_projektarbeit(pa)
            return proja, 200
        else:
            return "", 500

    @projectone.marshal_with(projektarbeiten)
    @secured
    def delete(self, id):
        """Löschen eines bestimmten Projektarbeit-Objekts.

        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        pab = adm.get_projektarbeit_by_id(id)
        adm.delete_projektarbeit(pab)
        return "", 200


@projectone.route("/projektarbeiten-activity/<int:activity>/<int:user>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Projektarbeit-Objekts")
class ProjektarbeitenByActivityIdOperations(Resource):
    @projectone.marshal_with(projektarbeiten)
    def get(self, activity, user):
        """Auslesen eines bestimmten Projektarbeit-Objekts anhand der Aktivitäten-ID.

        Das auszulesende Objekt wird durch die ```Activity-ID``` in dem URI bestimmt.
        """
        adm = Administration()
        projektarbeitenac = adm.get_projektarbeit_by_activity_id(activity, user)
        return projektarbeitenac


@projectone.route("/projektarbeit-by-start/<int:kommen>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Projektarbeit-Objekts")
class ProjektarbeitenGehenOperations(Resource):
    @projectone.marshal_with(projektarbeiten)
    def get(self, kommen):

        adm = Administration()
        projektarbeitenac = adm.get_projektarbeit_by_start(kommen)
        return projektarbeitenac


@projectone.route("/pause")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class PausenListOperations(Resource):
    @projectone.marshal_with(pausen, code=200)
    @projectone.expect(pausen)  # Wir erwarten ein Pausen-Objekt von der Client-Seite.
    def post(self):
        adm = Administration()

        proposal = Pause.from_dict(api.payload)

        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
        if proposal is not None:

            pa = adm.create_pause(
                proposal.get_bezeichnung(), proposal.get_start(), proposal.get_ende()
            )
            return pa, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/pausen/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Pausen-Objekts")
class PausenOperations(Resource):
    @projectone.marshal_with(pausen)
    def get(self, id):

        adm = Administration()
        pausen = adm.get_pause_by_id(id)
        return pausen

    @projectone.marshal_with(pausen)
    def put(self, id):

        adm = Administration()
        pau = Pause.from_dict(api.payload)

        if pau is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Pausen-Objekts gesetzt."""
            pau.set_id(id)
            p = adm.update_pause(pau)
            return p, 200
        else:
            return "", 500

    @projectone.marshal_with(pausen)
    def delete(self, id):
        """Löschen eines bestimmten Pausen-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        pu = adm.get_pause_by_id(id)
        adm.delete_pause(pu)
        return "", 200


"""ANCHOR Projekt Views
"""


@projectone.route("/projects/<int:user>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ProjectListOperations(Resource):
    @projectone.marshal_with(project, code=200)
    @projectone.expect(project)  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self, user):

        adm = Administration()

        proposal = Project.from_dict(api.payload)

        if proposal is not None:

            a = adm.create_project(
                proposal.get_projektname(),
                proposal.get_laufzeit(),
                proposal.get_auftraggeber(),
                proposal.get_availablehours(),
            )
            adm.create_membership(user=user, project=a.get_id(), projektleiter=True)
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/projects/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ProjectListOperations(Resource):
    @projectone.marshal_with(project)
    def get(self, id):
        adm = Administration()
        project = adm.get_project_by_id(id)
        return project

    @projectone.marshal_with(project)
    def put(self, id):
        """Update eines bestimmten Project-Objekts."""
        adm = Administration()
        pr = Project.from_dict(api.payload)

        if pr is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            pr.set_id(id)
            proj = adm.update_project(pr)
            return proj, 200
        else:
            return pr, 500

    @projectone.marshal_with(project)
    @secured
    def delete(self, id):
        """Löschen eines bestimmten Project-Objekts."""
        adm = Administration()
        project = adm.get_project_by_id(id)
        adm.delete_project(project)
        return "", 200


@projectone.route("/projektlaufzeit/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ProjectListOperations(Resource):
    @projectone.marshal_with(zeitintervall)
    def get(self, id):
        adm = Administration()
        project = adm.get_projectlaufzeit_by_id(id)
        return project


@projectone.route("/projektlaufzeitAnfang/<int:user>/<string:bezeichnung>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ProjectListOperations(Resource):
    @projectone.marshal_with(ereignis)
    def post(self, user, bezeichnung):
        adm = Administration()

        proposal = Ereignis()
        proposal.set_zeitpunkt(api.payload["zeitpunkt"])
        proposal.set_bezeichnung(api.payload["bezeichnung"])

        if proposal is not None:

            er = adm.create_ereignis(
                proposal.get_zeitpunkt(), proposal.get_bezeichnung()
            )
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=False,
                ereignis=er.get_id(),
                bezeichnung="Projektanfang " + bezeichnung,
            )
            return er, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route(
    "/projektlaufzeitEnde/<int:user>/<int:projektAnfang>/<string:bezeichnung>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ProjectListOperations(Resource):
    @projectone.marshal_with(zeitintervall)
    def post(self, user, projektAnfang, bezeichnung):
        adm = Administration()

        proposal = Ereignis()
        proposal.set_zeitpunkt(api.payload["zeitpunkt"])
        proposal.set_bezeichnung(api.payload["bezeichnung"])

        if proposal is not None:

            er = adm.create_ereignis(
                proposal.get_zeitpunkt(), proposal.get_bezeichnung()
            )
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=False,
                ereignis=er.get_id(),
                bezeichnung="Projektende " + bezeichnung,
            )

            zeitintervall = adm.create_zeitintervall(
                "Projektlaufzeit " + bezeichnung, projektAnfang, er.get_id()
            )
            adm.create_zeitintervallbuchung(
                zeitintervall.get_id(), False, user, user, "Projektlaufzeit"
            )
            return zeitintervall, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


"""ANCHOR Aktivitäten Views
"""


@projectone.route("/aktivitaeten-by-project/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des User-Objekts")
class AktivitätenProjectOperations(Resource):
    @projectone.marshal_with(aktivitäten)
    def get(self, project):

        """Auslesen eines bestimmten Aktivitäten-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        akt = Administration()
        aktivitäten = akt.get_activities_by_project(project)
        return aktivitäten


@projectone.route("/aktivitaeten")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des User-Objekts")
class AktivitätenErstellenOperations(Resource):
    @projectone.marshal_with(aktivitäten, code=200)
    @projectone.expect(aktivitäten)  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self):

        adm = Administration()
        proposal = Aktivitäten.from_dict(api.payload)

        if proposal is not None:
            a = adm.create_aktivitäten(
                proposal.get_bezeichnung(),
                proposal.get_dauer(),
                proposal.get_capacity(),
                proposal.get_project(),
            )
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return print("Projektleiter Falsch")


@projectone.route("/aktivitaeten/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des User-Objekts")
class AktivitätenOperations(Resource):
    @projectone.marshal_with(aktivitäten)
    def get(self, id):

        akt = Administration()
        aktivitäten = akt.get_aktivitäten_by_id(id)
        return aktivitäten

    @projectone.marshal_with(aktivitäten)
    def delete(self, id):

        adm = Administration()
        aktd = adm.get_aktivitäten_by_id(id)
        adm.delete_aktivitäten(aktd)
        return "", 200

    @projectone.marshal_with(aktivitäten)
    def put(self, id):

        adm = Administration()
        ak = Aktivitäten.from_dict(api.payload)

        if ak is not None:
            """Hierdurch wird die id des zu überschreibenden (vgl. Update) Account-Objekts gesetzt.
            Siehe Hinweise oben.
            """
            ak.set_id(id)
            adm.update_aktivitäten(ak)
            return ak, 200
        else:
            return print("Kein Projektleiter"), 500


"""ANCHOR User Views
"""


@projectone.route("/users/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des User-Objekts")
class UserOperations(Resource):
    @projectone.marshal_with(user)
    def get(self, id):
        """Auslesen eines bestimmten User-Objekts.
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
        return "", 200

    @projectone.marshal_with(user)
    @projectone.expect(user)
    def put(self, id):
        """Update eines bestimmten User-Objekts.
        Relevante id ist die id, die mittels URI bereitgestellt und somit als Methodenparameter
        verwendet wird. Dieser Parameter überschreibt das ID-Attribut des im Payload der Anfrage übermittelten
        User-Objekts.
        """
        adm = Administration()
        up = User.from_dict(api.payload)
        up.set_id(id)
        adm.save_user(up)
        return up


@projectone.route("/users-by-gid/<string:google_user_id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("google_user_id", "Die G-ID des User-Objekts")
class UserByGoogleUserIdOperations(Resource):
    @projectone.marshal_with(user)
    @secured
    def get(self, google_user_id):
        """Auslesen eines bestimmten User-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        userg = adm.get_user_by_google_user_id(google_user_id)
        return userg


@projectone.route("/potential-members/<int:user>/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("google_user_id", "Die G-ID des User-Objekts")
class PotentialMembers(Resource):
    @projectone.marshal_with(user)
    def get(self, user, project):
        """Auslesen eines bestimmten User-Objekts, welcher noch nicht im Projekt Mitglied ist.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        userg = adm.get_potential_users_for_project(user, project)
        return userg


"""ANCHOR Arbeitszeitkonto
"""


@projectone.route("/arbeitszeitkonto-by-user/<int:user>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("user", "Die ID des User-Objekts")
class ArbeitszeitkontoOperations(Resource):
    @projectone.marshal_with(arbeitszeitkonto)
    def get(self, user):
        """Auslesen eines bestimmten Arbeitszeit-Objekts.

        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        arb = adm.get_arbeitszeitkonto_by_userID(user)
        adm.update_arbeitszeitkonto_ist_arbeitsleistung(user)
        adm.update_arbeitszeitkonto_gleitzeit(user)
        adm.update_arbeitszeitkonto_abwesenheit(user)
        return arb

    @projectone.marshal_with(arbeitszeitkonto)
    def put(self, user):
        """Update eines bestimmten User-Objekts."""
        adm = Administration()
        up = Arbeitszeitkonto.from_dict(api.payload)

        if up is not None:
            up.set_user(user)
            ar = adm.update_arbeitszeitkonto(up)
            return ar, 200
        else:
            return "", 500

    @projectone.marshal_with(arbeitszeitkonto)
    def delete(self, user):
        """Löschen eines bestimmten User-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()

        arb = adm.get_arbeitszeitkonto_by_id(user)
        adm.delete_arbeitszeitkonto(arb)
        return "", 200


@projectone.route("/ereignisbuchung")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class EreignisbuchungenListOperations(Resource):
    @projectone.marshal_with(ereignisbuchungen, code=200)
    @projectone.expect(
        ereignisbuchungen
    )  # Wir erwarten ein Ereignisbuchungen-Objekt von Client-Seite.
    def post(self):
        adm = Administration()

        proposal = Ereignisbuchung.from_dict(api.payload)

        if proposal is not None:

            e = adm.create_ereignisbuchung(
                proposal.get_erstellt_von(),
                proposal.get_erstellt_für(),
                proposal.get_ist_buchung(),
                proposal.get_ereignis(),
                proposal.get_bezeichnung(),
            )
            return e, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/ereignisbuchungen/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Ereignisbuchung-Objekts")
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
        """Update eines bestimmten Ereignisbuchung-Objekts."""
        adm = Administration()
        er = Ereignisbuchung.from_dict(api.payload)

        if er is not None:
            er.set_id(id)
            era = adm.update_ereignisbuchung(er)
            return era, 200
        else:
            return "", 500

    @projectone.marshal_with(ereignisbuchungen)
    def delete(self, id):
        """Löschen eines bestimmten Ereignisbuchung-Objekts."""
        adm = Administration()

        ergd = adm.get_ereignisbuchung_by_id(id)
        adm.delete_ereignisbuchung(ergd)
        return "", 200


@projectone.route(
    "/ereignisbuchungen-soll/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Ereignisbuchung-Objekts")
class EreignisbuchungenOperations(Resource):
    @projectone.marshal_with(ereignisbuchungen)
    def get(self, erstellt_fuer, startFilter, endeFilter):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        ereignisbuchungen = adm.get_soll_ereignisbuchungen_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter
        )
        return ereignisbuchungen


@projectone.route(
    "/ereignisbuchungen-ist/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Ereignisbuchung-Objekts")
class EreignisbuchungenOperations(Resource):
    @projectone.marshal_with(ereignisbuchungen)
    def get(self, erstellt_fuer, startFilter, endeFilter):
        """Auslesen eines bestimmten Ereignisbuchungs-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        ereignisbuchungen = adm.get_ist_eregnisbuchungen_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter
        )
        return ereignisbuchungen


@projectone.route(
    "/projektereignis-ist/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Ereignisbuchung-Objekts")
class EreignisbuchungenOperations(Resource):
    @projectone.marshal_with(ereignisbuchungen)
    def get(self, erstellt_fuer, startFilter, endeFilter):
        """Auslesen eines bestimmten Ererignisbuchungs-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        ereignisbuchungen = adm.get_ist_projektereignis_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter
        )
        return ereignisbuchungen


@projectone.route(
    "/projektereignis-soll/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Ereignisbuchung-Objekts")
class EreignisbuchungenOperations(Resource):
    @projectone.marshal_with(ereignisbuchungen)
    def get(self, erstellt_fuer, startFilter, endeFilter):
        """Auslesen eines bestimmten Ereignisbuchung-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        ereignisbuchungen = adm.get_soll_projektereignis_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter
        )
        return ereignisbuchungen


"""ANCHOR Gehen Views
"""


@projectone.route(
    "/gehen-ist/<int:kommen>/<int:user>/<int:activity>/<string:gehenZeit>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class GehenListOperations(Resource):
    @projectone.marshal_with(gehen, code=200)
    def post(self, kommen, user, activity, gehenZeit):

        adm = Administration()

        proposal = Gehen()
        proposal.set_zeitpunkt(gehenZeit)
        proposal.set_bezeichnung("gehen")

        if proposal is not None:

            g = adm.create_gehen(proposal.get_zeitpunkt(), proposal.get_bezeichnung())
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=True,
                ereignis=g.get_id(),
                bezeichnung="Arbeitsende",
            )
            projektarbeit = adm.get_projektarbeit_by_start(kommen)
            projektarbeit.set_ende(g.get_id())
            projektarbeit.set_activity(activity)
            proarb = adm.update_projektarbeit(projektarbeit)
            zeitintervallbuchung = adm.create_zeitintervallbuchung(
                proarb.get_id(), True, user, user, "Projektarbeit"
            )
            
            return g, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route(
    "/gehen-soll/<int:kommen>/<int:erstellt_von>/<int:erstellt_fuer>/<int:activity>/<string:projektarbeit>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class GehenSollListOperations(Resource):
    @projectone.marshal_with(gehen, code=200)
    def post(self, kommen, erstellt_von, erstellt_fuer, activity, projektarbeit):

        adm = Administration()

        proposal = Gehen.from_dict(api.payload)

        if proposal is not None:

            g = adm.create_gehen(proposal.get_zeitpunkt(), proposal.get_bezeichnung())
            adm.create_ereignisbuchung(
                erstellt_von=erstellt_von,
                erstellt_für=erstellt_fuer,
                ist_buchung=False,
                ereignis=g.get_id(),
                bezeichnung="Arbeitsende",
            )
            proarb = adm.create_projektarbeit(
                bezeichnung=projektarbeit,
                beschreibung="",
                start=kommen,
                ende=g.get_id(),
                activity=activity,
            )
            adm.create_zeitintervallbuchung(
                proarb.get_id(), False, erstellt_von, erstellt_fuer, "Projektarbeit"
            )
            return g, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/gehen/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Gehen-Objekts")
class GehenOperations(Resource):
    @projectone.marshal_with(gehen)
    def get(self, id):
        adm = Administration()
        gehen = adm.get_gehen_by_id(id)
        return gehen

    @projectone.marshal_with(gehen)
    def put(self, id):
        adm = Administration()
        ge = Gehen()
        ge.set_zeitpunkt(api.payload["zeitpunkt"])
        ge.set_bezeichnung(api.payload["bezeichnung"])

        if ge is not None:

            ge.set_id(id)
            geh = adm.update_gehen(ge)
            return geh, 200
        else:
            return "", 500

    @projectone.marshal_with(gehen)
    def delete(self, id):
        """Löschen eines bestimmten Gehen-Objekts."""
        adm = Administration()

        gehend = adm.get_gehen_by_id(id)
        adm.delete_gehen(gehend)
        return "", 200


"""ANCHOR Kommen Views
"""


@projectone.route("/kommen-ist/<int:user>/<string:projektarbeit>/<string:kommenZeit>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class KommenListOperations(Resource):
    @projectone.marshal_with(kommen, code=200)
    @projectone.expect(kommen)  # Wir erwarten ein Kommen-Objekt von Client-Seite.
    def post(self, user, projektarbeit, kommenZeit):

        adm = Administration()

        proposal = Kommen()
        proposal.set_zeitpunkt(kommenZeit)
        proposal.set_bezeichnung("kommen")

        if proposal is not None:

            k = adm.create_kommen(proposal.get_zeitpunkt(), proposal.get_bezeichnung())
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=True,
                ereignis=k.get_id(),
                bezeichnung="Arbeitsbeginn",
            )
            adm.create_projektarbeit(
                bezeichnung=projektarbeit,
                beschreibung="",
                start=k.get_id(),
                ende=0,
                activity=0,
            )

            return k, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/kommen-soll/<int:erstellt_von>/<int:erstellt_fuer>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class KommenListOperations(Resource):
    @projectone.marshal_with(kommen, code=200)
    @projectone.expect(kommen)  # Wir erwarten ein Kommen-Objekt von Client-Seite.
    def post(self, erstellt_von, erstellt_fuer):

        adm = Administration()

        proposal = Kommen.from_dict(api.payload)

        if proposal is not None:

            k = adm.create_kommen(proposal.get_zeitpunkt(), proposal.get_bezeichnung())
            adm.create_ereignisbuchung(
                erstellt_von=erstellt_von,
                erstellt_für=erstellt_fuer,
                ist_buchung=False,
                ereignis=k.get_id(),
                bezeichnung="Arbeitsbeginn",
            )

            return k, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/kommen/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Kommen-Objekts")
class KommenOperations(Resource):
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
        """Update eines bestimmten Kommen-Objekts."""
        adm = Administration()
        ko = Kommen()
        ko.set_zeitpunkt(api.payload["zeitpunkt"])
        ko.set_bezeichnung(api.payload["bezeichnung"])

        if ko is not None:
            ko.set_id(id)
            komm = adm.update_kommen(ko)
            return komm, 200
        else:
            return "", 500

    @projectone.marshal_with(kommen)
    def delete(self, id):
        """Löschen eines bestimmten Kommen-Objekts."""
        adm = Administration()

        komd = adm.get_kommen_by_id(id)
        adm.delete_kommen(komd)
        return "", 200


@projectone.route("/zeitintervallbuchung")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ZeitintervallbuchungListOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung, code=200)
    @projectone.expect(
        zeitintervallbuchung
    )  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self):
        adm = Administration()
        proposal = Zeitintervallbuchung.from_dict(api.payload)

        if proposal is not None:

            a = adm.create_zeitintervallbuchung(
                proposal.get_zeitintervall(),
                proposal.get_ist_buchung(),
                proposal.get_erstellt_von(),
                proposal.get_erstellt_für(),
                proposal.get_bezeichnung(),
            )
            adm.update_arbeitszeitkonto_ist_arbeitsleistung(a.get_erstellt_von())
            adm.update_arbeitszeitkonto_gleitzeit(a.get_erstellt_von())
            adm.update_arbeitszeitkonto_abwesenheit(a.get_erstellt_von())
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/zeitintervallbuchung/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des User-Objekts")
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
        """Update eines bestimmten Zeitintervallbuchung-Objekts."""
        adm = Administration()
        ze = Zeitintervallbuchung.from_dict(api.payload)

        if ze is not None:
            ze.set_id(id)
            buch = adm.update_zeitintervallbuchung(ze)
            return buch , 200
        else:
            return "", 500

    @projectone.marshal_with(zeitintervallbuchung)
    def delete(self, id):
        """Löschen eines bestimmten Zeitintervallbuchung-Objekts."""
        adm = Administration()

        zetd = adm.get_zeitintervallbuchung_by_id(id)
        adm.delete_zeitintervallbuchung(zetd)
        return "", 200


@projectone.route(
    "/zeitintervallbuchung-soll/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des zeitintervallbuchung-user-Objekts")
class ZeitintervallbuchungOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung)
    def get(self, erstellt_fuer, startFilter, endeFilter):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts.
        Das auszulesende Objekt wird durch die ```id``` in dem URI bestimmt.
        """
        adm = Administration()
        zeitintervallbuchung = adm.get_soll_zeitintervallbuchungen_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter
        )
        return zeitintervallbuchung


@projectone.route("/zeitintervallbuchung-ist-by-akt/<int:user>/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des zeitintervallbuchung-user-Objekts")
class ZeitintervallbuchungOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung)
    def get(self, user, project):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts."""
        adm = Administration()
        zeitintervallbuchung = adm.get_ist_buchungen_by_project(user, project)
        return zeitintervallbuchung


@projectone.route("/zeitintervallbuchung-soll-by-akt/<int:user>/<int:project>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des zeitintervallbuchung-user-Objekts")
class ZeitintervallbuchungOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung)
    def get(self, user, project):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts."""
        adm = Administration()
        zeitintervallbuchung = adm.get_soll_buchungen_by_project(user, project)
        return zeitintervallbuchung


@projectone.route(
    "/zeitintervallbuchung-ist/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des zeitintervallbuchung-user-Objekts")
class ZeitintervallbuchungOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung)
    def get(self, erstellt_fuer, startFilter, endeFilter):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts."""
        adm = Administration()
        zeitintervallbuchung = adm.get_ist_zeitintervallbuchungen_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter
        )
        return zeitintervallbuchung


@projectone.route(
    "/projektarbeitbuchung-ist/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>/<int:activity>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des zeitintervallbuchung-user-Objekts")
class ZeitintervallbuchungOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung)
    def get(self, erstellt_fuer, startFilter, endeFilter, activity):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts."""
        adm = Administration()
        zeitintervallbuchung = adm.get_ist_projektarbeitbuchungen_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter, activity
        )
        return zeitintervallbuchung


@projectone.route(
    "/projektarbeitbuchung-soll/<int:erstellt_fuer>/<string:startFilter>/<string:endeFilter>/<int:activity>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des zeitintervallbuchung-user-Objekts")
class ZeitintervallbuchungOperations(Resource):
    @projectone.marshal_with(zeitintervallbuchung)
    def get(self, erstellt_fuer, startFilter, endeFilter, activity):
        """Auslesen eines bestimmten Zeitintervallbuchung-Objekts."""
        adm = Administration()
        zeitintervallbuchung = adm.get_soll_projektarbeitbuchungen_by_zeitspanne(
            erstellt_fuer, startFilter, endeFilter, activity
        )
        return zeitintervallbuchung


@projectone.route("/pausenBeginn/<int:user>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class EreignisListOperations(Resource):
    @projectone.marshal_with(ereignis, code=200)
    @projectone.expect(ereignis)  # Wir erwarten ein Ereignis-Objekt von Client-Seite.
    def post(self, user):

        adm = Administration()

        proposal = Ereignis()
        proposal.set_zeitpunkt(api.payload["zeitpunkt"])
        proposal.set_bezeichnung(api.payload["bezeichnung"])

        if proposal is not None:

            er = adm.create_ereignis(
                proposal.get_zeitpunkt(), proposal.get_bezeichnung()
            )
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=True,
                ereignis=er.get_id(),
                bezeichnung="Pausenbeginn",
            )
            adm.create_pause(bezeichnung="Pause", start=er.get_id(), ende=0)

            return er, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/pausenEnde/<int:pausenBeginn>/<int:user>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class EreignisListOperations(Resource):
    @projectone.marshal_with(ereignis, code=200)
    @projectone.expect(ereignis)  # Wir erwarten ein Ereignis-Objekt von Client-Seite.
    def post(self, pausenBeginn, user):

        adm = Administration()

        proposal = Ereignis()
        proposal.set_zeitpunkt(api.payload["zeitpunkt"])
        proposal.set_bezeichnung(api.payload["bezeichnung"])

        if proposal is not None:

            er = adm.create_ereignis(
                proposal.get_zeitpunkt(), proposal.get_bezeichnung()
            )
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=True,
                ereignis=er.get_id(),
                bezeichnung="Pausenende",
            )
            pause = adm.get_pause_by_beginn(pausenBeginn)
            pause.set_ende(er.get_id())
            pa = adm.update_pause(pause)
            zeitintervallbuchung = adm.create_zeitintervallbuchung(
                pa.get_id(), True, user, user, "Pause"
            )

            adm.update_arbeitszeitkonto_ist_arbeitsleistung(user)
            adm.update_arbeitszeitkonto_gleitzeit(user)

            return er, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/ereignis/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des Ereignis-Objekts")
class EreignisOperations(Resource):
    @projectone.marshal_with(ereignis)
    def get(self, id):
        """Auslesen eines bestimmten Ereignis-Objekts."""
        adm = Administration()
        ereignis = adm.get_ereignis_by_id(id)
        return ereignis

    @projectone.marshal_with(ereignis)
    def put(self, id):
        """Update eines bestimmten Ereignis-Objekts."""
        adm = Administration()
        proposal = Ereignis()
        proposal.set_zeitpunkt(api.payload["zeitpunkt"])
        proposal.set_bezeichnung(api.payload["bezeichnung"])

        if proposal is not None:

            proposal.set_id(id)
            proposal = adm.update_ereignis(proposal)
            return proposal, 200
        else:
            return "", 500

    @projectone.marshal_with(ereignis)
    def delete(self, id):
        """Löschen eines bestimmten Ereignis-Objekts.
        Das zu löschende Objekt wird durch die ```id``` in dem URI bestimmt."""

        adm = Administration()

        erid = adm.get_ereignis_by_id(id)
        adm.delete_ereignis(erid)
        return "", 200


@projectone.route("/abwesenheitBeginn/<int:user>/<string:abwesenheitsart>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class AbwesenheitListOperations(Resource):
    @projectone.marshal_with(ereignis, code=200)
    @projectone.expect(ereignis)  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self, user, abwesenheitsart):

        adm = Administration()

        proposal = Ereignis()
        proposal.set_zeitpunkt(api.payload["zeitpunkt"])
        proposal.set_bezeichnung(api.payload["bezeichnung"])

        if proposal is not None:
            er = adm.create_ereignis(
                proposal.get_zeitpunkt(), proposal.get_bezeichnung()
            )
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=True,
                ereignis=er.get_id(),
                bezeichnung=abwesenheitsart + "" + "Beginn",
            )
            return er, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route(
    "/abwesenheitEnde/<int:abwesenheitsBeginn>/<int:user>/<string:abwesenheitsart>"
)
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class AbwesenheitListOperations(Resource):
    @projectone.marshal_with(ereignis, code=200)
    @projectone.expect(ereignis)  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self, user, abwesenheitsart, abwesenheitsBeginn):

        adm = Administration()

        proposal = Ereignis()
        proposal.set_zeitpunkt(api.payload["zeitpunkt"])
        proposal.set_bezeichnung(api.payload["bezeichnung"])

        if proposal is not None:

            er = adm.create_ereignis(
                proposal.get_zeitpunkt(), proposal.get_bezeichnung()
            )
            adm.create_ereignisbuchung(
                erstellt_von=user,
                erstellt_für=user,
                ist_buchung=True,
                ereignis=er.get_id(),
                bezeichnung=abwesenheitsart + "" + "Ende",
            )
            abwesenheit = adm.create_abwesenheit(
                abwesenheitsBeginn,
                er.get_id(),
                adm.get_abwesenheitsart(abwesenheitsart),
                abwesenheitsart,
            )
            adm.create_zeitintervallbuchung(
                abwesenheit.get_id(), True, user, user, "Abwesenheit"
            )

            adm.update_arbeitszeitkonto_ist_arbeitsleistung(user)
            adm.update_arbeitszeitkonto_gleitzeit(user)
            adm.update_arbeitszeitkonto_abwesenheit(user)
            return er, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/abwesenheit/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des User-Objekts")
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
        """Update eines bestimmten Abwesenheit-Objekts."""
        adm = Administration()
        ab = Abwesenheit.from_dict(api.payload)

        if ab is not None:
            ab.set_id(id)
            adm.update_abwesenheit(ab)
            return "", 200
        else:
            return "", 500

    @projectone.marshal_with(abwesenheit)
    def delete(self, id):
        """Löschen eines bestimmten Abwesenheit-Objekts."""
        adm = Administration()

        abtd = adm.get_abwesenheit_by_id(id)
        adm.delete_abwesenheit(abtd)
        return "", 200


@projectone.route("/zeitintervall")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
class ZeitintervallListOperations(Resource):
    @projectone.marshal_with(zeitintervall, code=200)
    @projectone.expect(zeitintervall)  # Wir erwarten ein User-Objekt von Client-Seite.
    def post(self):

        adm = Administration()
        print(api.payload)
        proposal = Zeitintervall.from_dict(api.payload)

        if proposal is not None:
            a = adm.create_zeitintervall(
                proposal.get_bezeichnung(), proposal.get_start(), proposal.get_ende()
            )
            return a, 200
        else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
            return "", 500


@projectone.route("/zeitintervall/<int:id>")
@projectone.response(500, "Falls es zu einem Server-seitigen Fehler kommt.")
@projectone.param("id", "Die ID des User-Objekts")
class ZeitintervallOperations(Resource):
    @projectone.marshal_with(zeitintervall)
    def get(self, id):
        adm = Administration()
        zeitintervall = adm.get_zeitintervall_by_id(id)
        return zeitintervall

    @projectone.marshal_with(zeitintervall)
    def put(self, id):
        adm = Administration()
        zi = zeitintervall.from_dict(api.payload)

        if zi is not None:
            zi.set_id(id)
            adm.update_zeitintervall(zi)
            return "", 200
        else:
            return "", 500

    @projectone.marshal_with(zeitintervall)
    def delete(self, id):
        adm = Administration()

        zi = adm.get_zeitintervall_by_id(id)
        adm.delete_zeitintervall(zi)
        return "", 200


""" !SECTION 
"""


if __name__ == "__main__":
    app.run(debug=True)
