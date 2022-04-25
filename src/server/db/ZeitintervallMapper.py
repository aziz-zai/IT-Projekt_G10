from time import time
from server.bo.ZeitintervallBO import Zeitintervall
from server.db.Mapper import Mapper


class ZeitintervallMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, start, ende, zeitdifferenz from zeitintervall")
        tuples = cursor.fetchall()

        for (id, timestamp, start, ende, zeitdifferenz) in tuples:
            zeitintervall = Zeitintervall(id=id, timestamp=timestamp, start=start, ende=ende, zeitdifferenz=zeitdifferenz)

            result.append(zeitintervall)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Zeitintervalls mit vorgegebener Zeitintervall ID, da diese eindeutig ist."""

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, start, ende, zeitdifferenz FROM zeitintervall WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, start, ende, zeitdifferenz) = tuples[0]
            zeitintervall = Zeitintervall(
            id=id,
            timestamp=timestamp,
            start=start,
            ende=ende,
            zeitdifferenz=zeitdifferenz)
            result = zeitintervall

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
        

    def insert(self, zeitintervall: Zeitintervall) -> Zeitintervall:
        """Create zeitintervall Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM zeitintervall")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                zeitintervall.id = maxid[0] + 1
            else:
                zeitintervall.id = 1
        command = """
            INSERT INTO zeitintervall (
                id, timestamp, start, ende, zeitdifferenz
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            zeitintervall.id,
            zeitintervall.timestamp,
            zeitintervall.start,
            zeitintervall.ende,
            zeitintervall.zeitdifferenz,
        ))
        self._cnx.commit()

        return zeitintervall
    
    def update(self, zeitintervall: Zeitintervall) -> Zeitintervall:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param zeitintervall das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE zeitintervall SET timestamp=%s, start=%s, ende=%s, zeitdifferenz=%s WHERE id=%s"
        data = (zeitintervall.timestamp, zeitintervall.start, zeitintervall.ende, zeitintervall.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitintervall

    def delete(self, zeitintervall):

        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitintervall WHERE id={}".format(zeitintervall.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()