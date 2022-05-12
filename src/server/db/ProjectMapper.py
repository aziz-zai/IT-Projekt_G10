
from re import U
from server.bo.ProjectBO import Project
from server.db.Mapper import Mapper

class ProjectMapper(Mapper):
    
    def __init__(self):
        super().__init__()

    def insert(self, project: Project) -> Project:
        """Create Project Object"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM project ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                project.id = maxid[0] + 1
            else:
                project.id = 1
        command = """
            INSERT INTO project (
                id, timestamp, projektname, laufzeit, auftraggeber, projektleiter, availablehours, user
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            project.id,
            project.timestamp,
            project.projektname,
            project.laufzeit,
            project.auftraggeber,
            project.projektleiter,
            project.availablehours,
            project.user
        ))
        self._cnx.commit()

        return project     

    def update(self, project: Project) -> Project:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE project SET timestamp=%s, projektname=%s, laufzeit=%s, auftraggeber=%s, projektleiter=%s, availablehours=%s, user=%s WHERE id=%s"
        data = (project.timestamp, project.projektname, project.laufzeit, project.auftraggeber, project.projektleiter, project.availablehours, project.user, project.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return project   

    def find_all(self):
        """ Auslesen aller Projekt-Objekte"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, projektname, laufzeit, auftraggeber, projektleiter, availablehours, user from project")
        tuples = cursor.fetchall()

        for (id, timestamp, projektname, laufzeit, auftraggeber, projektleiter, availablehours, user) in tuples:
            project = Project(id=id, timestamp=timestamp, projektname=projektname, laufzeit=laufzeit, auftraggeber=auftraggeber, 
            projektleiter=projektleiter, availablehours=availablehours, user=user)

            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, projektname, laufzeit, auftraggeber, projektleiter, availablehours, user FROM project WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, projektname, laufzeit, auftraggeber, projektleiter, availablehours, user) = tuples[0]
            project = Project(
            id=id,
            timestamp=timestamp,
            projektname=projektname,
            laufzeit=laufzeit,
            auftraggeber=auftraggeber,
            projektleiter=projektleiter,
            availablehours=availablehours,
            user=user)
            result = project
        except IndexError:
            result = None
        
        self._cnx.commit()
        cursor.close()

        return result