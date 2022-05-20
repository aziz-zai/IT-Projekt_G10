from time import time
from server.bo.GehenBO import Gehen
from server.db.Mapper import Mapper


class GehenMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Gehen einträge.

        :return Eine Sammlung mit Gehen-Objekten, die sämtliche Gehen
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, zeitpunkt from gehen")
        tuples = cursor.fetchall()

        for (id, timestamp, zeitpunkt) in tuples:
            gehen = Gehen(id = id, timestamp = timestamp, zeitpunkt = zeitpunkt)

            result.append(gehen)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Gehen-Eintrags mit vorgegebener Gehen ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, zeitpunkt FROM gehen WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, zeitpunkt) = tuples[0]
            gehen = Gehen(
            id = id,
            timestamp = timestamp,
            zeitpunkt = zeitpunkt)
            result = gehen
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    
    def update(self, gehen: Gehen) -> Gehen:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param gehen das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE gehen SET timestamp = %s, zeitpunkt = %s WHERE id=%s"
        data = (gehen.timestamp, gehen.zeitpunkt, gehen.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return gehen


    def insert(self, gehen: Gehen) -> Gehen:
        """Create gehen Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM gehen")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                gehen.id = maxid[0] + 1
            else:
                gehen.id = 1
        command = """
            INSERT INTO gehen (
                id, timestamp, zeitpunkt
            ) VALUES (%s,%s,%s)
        """
        cursor.execute(command, (
            gehen.id,
            gehen.timestamp,
            gehen.zeitpunkt
        ))
        self._cnx.commit()

        return gehen

    def delete(self, gehen):

        cursor = self._cnx.cursor()

        command = "DELETE FROM gehen WHERE id={}".format(gehen.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        