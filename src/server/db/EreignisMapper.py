from time import time
from server.bo.EreignisBO import Ereignis
from server.db.Mapper import Mapper


class EreignisMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Ereignisse.

        :return Eine Sammlung mit Ereignis-Objekten, die sämtliche Ereignisse
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, zeitpunkt from ereignis")
        tuples = cursor.fetchall()

        for (id, timestamp, zeitpunkt) in tuples:
            ereignis = Ereignis(id=id, timestamp = timestamp, zeitpunkt = zeitpunkt)

            result.append(ereignis)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Ereignisses mit vorgegebener Ereignis ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, zeitpunkt FROM ereignis WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, zeitpunkt) = tuples[0]
            ereignis = Ereignis(
            id = id,
            timestamp = timestamp,
            zeitpunkt = zeitpunkt)
            result = ereignis
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def update(self, ereignis: Ereignis) -> Ereignis:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param ereignis das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE ereignis SET timestamp=%s, zeitpunkt=%s WHERE id=%s"
        data = (ereignis.timestamp, ereignis.zeitpunkt, ereignis.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignis



    def insert(self, ereignis: Ereignis) -> Ereignis:
        """Create ereignis Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM ereignis ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                ereignis.id = maxid[0] + 1
            else:
                ereignis.id = 1
        command = """
            INSERT INTO ereignis (
                id, timestamp, zeitpunkt
            ) VALUES (%s,%s,%s)
        """
        cursor.execute(command, (
            ereignis.id,
            ereignis.timestamp,
            ereignis.zeitpunkt
           
        ))
        self._cnx.commit()

        return ereignis

    def delete(self, ereignis):

        cursor = self._cnx.cursor()

        command = "DELETE FROM ereignis WHERE id={}".format(ereignis.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        