from server.bo.ProjektarbeitBO import Projektarbeit
from server.db.Mapper import Mapper


class ProjektarbeitMapper(Mapper):

    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen einer Projektarbeit mit vorgegebener Projekt ID, da diese eindeutig ist"""

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, beschreibung, start, ende, activity FROM projektarbeit WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, beschreibung, start, ende, activity) = tuples[0]
            projektarbeit = Projektarbeit()
            projektarbeit.set_id(id),
            projektarbeit.set_timestamp(timestamp)
            projektarbeit.set_bezeichnung(bezeichnung)
            projektarbeit.set_beschreibung(beschreibung)
            projektarbeit.set_start(start)
            projektarbeit.set_ende(ende)
            projektarbeit.set_activity(activity)

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
        command = "SELECT id, timestamp, bezeichnung, beschreibung, start, ende, activity FROM projektarbeit WHERE activity={}".format(activity)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, beschreibung, start, ende, activity) = tuples[0]
            projektarbeit = Projektarbeit()
            projektarbeit.set_id(id),
            projektarbeit.set_timestamp(timestamp)
            projektarbeit.set_bezeichnung(bezeichnung)
            projektarbeit.set_beschreibung(beschreibung)
            projektarbeit.set_start(start)
            projektarbeit.set_ende(ende)
            projektarbeit.set_activity(activity)

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
                projektarbeit.set_id(maxid[0] + 1)
            else:
                projektarbeit.set_id(1)
        command = """
            INSERT INTO projektarbeit (
                id, timestamp, bezeichnung, beschreibung, start, ende, activity
            ) VALUES (%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            projektarbeit.get_id(),
            projektarbeit.get_timestamp(),
            projektarbeit.get_bezeichnung(),
            projektarbeit.get_beschreibung(),
            projektarbeit.get_start(),
            projektarbeit.get_ende(),
            projektarbeit.get_activity()
        ))
        self._cnx.commit()

        return projektarbeit
    
    def update(self, projektarbeit: Projektarbeit) -> Projektarbeit:
        cursor = self._cnx.cursor()

        command = "UPDATE projektarbeit SET timestamp=%s, bezeichnung=%s, beschreibung=%s, start=%s, ende=%s, activity=%s WHERE id=%s"
        data = (projektarbeit.get_timestamp(), projektarbeit.get_bezeichnung(), projektarbeit.get_beschreibung(), projektarbeit.get_start(), projektarbeit.get_ende(), projektarbeit.get_activity(), projektarbeit.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return projektarbeit

    def delete(self, projektarbeit):

        cursor = self._cnx.cursor()

        command = "DELETE FROM projektarbeit WHERE id={}".format(projektarbeit.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()