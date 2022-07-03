from server.bo.ProjectBO import Project
from server.bo.ZeitintervallBO import Zeitintervall
from server.db.Mapper import Mapper


class ProjectMapper(Mapper):
    def __init__(self):
        super().__init__()

    def insert(self, project: Project) -> Project:
        """
        Einfügen eines neuen Projekts in die Datenbank.
        Parameter project = ProjectBO, das eingefügt werden soll
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM project ")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                project.set_id(maxid[0] + 1)
            else:
                project.set_id(1)
        command = """
            INSERT INTO project (
                id, timestamp, projektname, laufzeit, auftraggeber, availablehours
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        data = (
            project.get_id(),
            project.get_timestamp(),
            project.get_projektname(),
            project.get_laufzeit(),
            project.get_auftraggeber(),
            project.get_availablehours(),
        )
        cursor.execute(command, data)

        self._cnx.commit()

        return project

    def update(self, project: Project) -> Project:
        """
        Änderung eines bereits bestehenden Projekts.
        Parameter project = ProjectBO, das geändert werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE project SET timestamp=%s, projektname=%s, laufzeit=%s, auftraggeber=%s, availablehours=%s WHERE id=%s"
        data = (
            project.get_timestamp(),
            project.get_projektname(),
            project.get_laufzeit(),
            project.get_auftraggeber(),
            project.get_availablehours(),
            project.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return project

    def find_by_key(self, key):
        """
        Suchen eines Projekts anhand der Projekt-ID.
        Parameter key = Projekt-ID
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, projektname, laufzeit, auftraggeber, availablehours FROM project WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (
                id,
                timestamp,
                projektname,
                laufzeit,
                auftraggeber,
                availablehours,
            ) = tuples[0]
            project = Project()
            project.set_id(id)
            project.set_timestamp(timestamp)
            project.set_projektname(projektname)
            project.set_laufzeit(laufzeit)
            project.set_auftraggeber(auftraggeber)
            project.set_availablehours(availablehours)
            result = project
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_activity(self, activity):
        """
        Suchen eines Projekts anhand der Aktivitäten-ID.
        Parameter activity = Aktivitäten-ID
        """
        result = None
        cursor = self._cnx.cursor()
        command = """SELECT id, timestamp, projektname, laufzeit, auftraggeber, availablehours 
        FROM projectone.project 
        WHERE id in(SELECT project FROM projectone.activity WHERE id={})""".format(
            activity
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (
                id,
                timestamp,
                projektname,
                laufzeit,
                auftraggeber,
                availablehours,
            ) = tuples[0]
            project = Project()
            project.set_id(id)
            project.set_timestamp(timestamp)
            project.set_projektname(projektname)
            project.set_laufzeit(laufzeit)
            project.set_auftraggeber(auftraggeber)
            project.set_availablehours(availablehours)
            result = project
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_laufzeit_by_key(self, project):
        """
        Suchen einer Projektlaufzeit anhand der Projekt-ID.
        Parameter project = Projekt-ID
        """
        result = None
        projektlaufzeit = project.get_laufzeit()
        cursor = self._cnx.cursor()
        command = """SELECT id, timestamp, bezeichnung, start, ende 
        FROM projectone.zeitintervall
        WHERE id in (SELECT id FROM projectone.project
        WHERE laufzeit={})
        """.format(
            projektlaufzeit
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, start, ende) = tuples[0]
            zeitintervall = Zeitintervall()
            zeitintervall.set_id(id)
            zeitintervall.set_timestamp(timestamp)
            zeitintervall.set_start(start)
            zeitintervall.set_ende(ende)
            zeitintervall.set_bezeichnung(bezeichnung)
            result = zeitintervall
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def delete(self, project):
        """
        Löschen eines Projekts aus der Datenbank anhand der Projekt-ID.
        Parameter project = Projekt-ID
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
