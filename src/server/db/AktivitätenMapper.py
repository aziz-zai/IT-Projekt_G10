from time import time
from server.bo.AktivitätenBO import Aktivitäten
from server.db.Mapper import Mapper


class AktivitätenMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, dauer, capacity, project FROM activity WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, dauer, capacity, project) = tuples[0]
            aktivitäten = Aktivitäten(
            id=id,
            timestamp=timestamp,
            bezeichnung=bezeichnung,
            dauer=dauer,
            capacity=capacity,
            project=project)
            result = aktivitäten
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_activties_by_project_id(self, project_id):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, dauer, capacity, project FROM activity WHERE id={}".format(project_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, dauer, capacity, project) = tuples[0]
            aktivitäten = Aktivitäten(
            id=id,
            timestamp=timestamp,
            bezeichnung=bezeichnung,
            dauer=dauer,
            capacity=capacity,
            project=project)
            result = aktivitäten
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

        

    def insert(self, aktivitäten: Aktivitäten) -> Aktivitäten:
        """Create activity Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM activity")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                aktivitäten.id = maxid[0] + 1
            else:
                aktivitäten.id = 1
        command = """
            INSERT INTO activity (
                id, timestamp, bezeichnung, dauer, capacity, project
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            aktivitäten.id,
            aktivitäten.timestamp,
            aktivitäten.bezeichnung,
            aktivitäten.dauer,
            aktivitäten.capacity,
            aktivitäten.project
        ))
        self._cnx.commit()

        return aktivitäten
    
    def update(self, aktivitäten: Aktivitäten) -> Aktivitäten:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param activity das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE activity SET timestamp=%s, bezeichnung=%s, dauer=%s, capacity=%s, project=%s WHERE id=%s"
        data = (aktivitäten.timestamp, aktivitäten.bezeichnung, aktivitäten.dauer, aktivitäten.capacity, aktivitäten.project, aktivitäten.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return aktivitäten

    def delete(self, aktivitäten):

        cursor = self._cnx.cursor()

        command = "DELETE FROM activity WHERE id={}".format(aktivitäten.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()