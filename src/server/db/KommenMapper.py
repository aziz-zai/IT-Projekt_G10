from time import time
from server.bo.KommenBO import Kommen
from server.db.Mapper import Mapper


class KommenMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Kommen-Eintrags mit vorgegebener Kommen ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, zeitpunkt, bezeichnung FROM kommen WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, zeitpunkt, bezeichnung) = tuples[0]
            kommen = Kommen(
            id = id,
            timestamp = timestamp,
            zeitpunkt = zeitpunkt,
            bezeichnung = bezeichnung)
            result = kommen
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    
    def update(self, kommen: Kommen) -> Kommen:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param kommen das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE kommen SET timestamp = %s, zeitpunkt = %s, bezeichnung = %s WHERE id=%s"
        data = (kommen.timestamp, kommen.zeitpunkt, kommen.bezeichnung, kommen.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return kommen


    def insert(self, kommen: Kommen) -> Kommen:
        """Create kommen Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM kommen")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                kommen.id = maxid[0] + 1
            else:
                kommen.id = 1
        command = """
            INSERT INTO kommen (
                id, timestamp, zeitpunkt, bezeichnung
            ) VALUES (%s,%s,%s,%s)
        """
        cursor.execute(command, (
            kommen.id,
            kommen.timestamp,
            kommen.zeitpunkt,
            kommen.bezeichnung
        ))
        self._cnx.commit()

        return kommen

    def delete(self, kommen):

        cursor = self._cnx.cursor()

        command = "DELETE FROM kommen WHERE id={}".format(kommen.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        