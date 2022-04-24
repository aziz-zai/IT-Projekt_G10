
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
                id, timestamp, projektname, laufzeit, auftraggeber
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            project.id,
            project.timestamp,
            project.projektname,
            project.laufzeit,
            project.auftraggeber,
        ))
        self._cnx.commit()

        return project        

    def find_all(self):
        """ Auslesen aller Projekt-Objekte"""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, projektname, laufzeit, auftraggeber from project")
        tuples = cursor.fetchall()

        for (id, timestamp, projektname, laufzeit, auftraggeber) in tuples:
            project = Project(id=id, timestamp=timestamp, projektname=projektname, laufzeit=laufzeit, auftraggeber=auftraggeber)

            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):

        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, projektname, laufzeit, auftraggeber FROM project WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, projektname, laufzeit, auftraggeber) = tuples[0]
            project = Project(
            id=id,
            timestamp=timestamp,
            projektname=projektname,
            laufzeit=laufzeit,
            auftraggeber=auftraggeber)
            result = project
        except IndexError:
            result = None
        
        self._cnx.commit()
        cursor.close()

        return result