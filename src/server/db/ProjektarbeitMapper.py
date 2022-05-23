from server.bo.ProjektarbeitBO import Projektarbeit
from server.db.Mapper import Mapper


class ProjektarbeitMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Projektes mit vorgegebener Projekt ID, da diese eindeutig ist"""

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, start, ende, bezeichnung, activity FROM projektarbeit WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, start, ende, bezeichnung, activity) = tuples[0]
            projektarbeit = Projektarbeit(
            id=id,
            timestamp=timestamp,
            start=start,
            ende=ende,
            bezeichnung=bezeichnung,
            activity=activity)

            result = projektarbeit

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_activity_id(self, activity):
        """Suchen einer Projektarbeit anhand der Aktivitäten-ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, start, ende, bezeichnung, activity FROM projektarbeit WHERE id={}".format(activity)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, start, ende, bezeichnung, activity) = tuples[0]
            projektarbeit = Projektarbeit(
            id=id,
            timestamp=timestamp,
            start=start,
            ende=ende,
            bezeichnung=bezeichnung,
            activity=activity)

            result = projektarbeit

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, projektarbeit: Projektarbeit) -> Projektarbeit:
        """Create projektarbeit Object"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM projektarbeit")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                projektarbeit.id = maxid[0] + 1
            else:
                projektarbeit.id = 1
        command = """
            INSERT INTO projektarbeit (
                id, timestamp, start, ende, bezeichnung, activity
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            projektarbeit.id,
            projektarbeit.timestamp,
            projektarbeit.start,
            projektarbeit.ende,
            projektarbeit.bezeichnung,
            projektarbeit.activity
        ))
        self._cnx.commit()

        return projektarbeit
    
    def update(self, projektarbeit: Projektarbeit) -> Projektarbeit:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param activity das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE projektarbeit SET timestamp=%s, start=%s, ende=%s, bezeichnung=%s, activity=%s WHERE id=%s"
        data = (projektarbeit.timestamp, projektarbeit.start, projektarbeit.ende, projektarbeit.bezeichnung, projektarbeit.activity, projektarbeit.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return projektarbeit

    def delete(self, projektarbeit):

        cursor = self._cnx.cursor()

        command = "DELETE FROM projektarbeit WHERE id={}".format(projektarbeit.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()