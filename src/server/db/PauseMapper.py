from time import time
from server.bo.PauseBO import Pause
from server.db.Mapper import Mapper


class PauseMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Projektes mit vorgegebener Pausen ID, da diese eindeutig ist"""

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, start, ende, zeitdifferenz FROM pause WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, start, ende, zeitdifferenz) = tuples[0]
            pause = Pause(
            id=id,
            timestamp=timestamp,
            start=start,
            ende=ende,
            zeitdifferenz=zeitdifferenz)

            result = pause

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
        

    def insert(self, pause: Pause) -> Pause:
        """Create pause Object"""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM pause")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                pause.id = maxid[0] + 1
            else:
                pause.id = 1
        command = """
            INSERT INTO pause (
                id, timestamp, start, ende, zeitdifferenz
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            pause.id,
            pause.timestamp,
            pause.start,
            pause.ende,
            pause.zeitdifferenz
        ))
        self._cnx.commit()

        return pause
    
    def update(self, pause: Pause) -> Pause:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param activity das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE pause SET timestamp=%s, start=%s, ende=%s, zeitdifferenz=%s WHERE id=%s"
        data = (pause.timestamp, pause.start, pause.ende, pause.zeitdifferenz)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return pause

    def delete(self, pause):

        cursor = self._cnx.cursor()

        command = "DELETE FROM pause WHERE id={}".format(pause.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()