from sqlite3 import Timestamp
from time import time
from server.bo.ZeitintervallbuchungBO import Zeitintervallbuchung
from server.db.Mapper import Mapper


class ZeitintervallbuchungMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, buchung, arbeitszeitkonto, timestamp, from zeitintervallbuchung")
        tuples = cursor.fetchall()

        for (id, buchung, arbeitszeitkonto, timestamp) in tuples:
            zeitintervallbuchung = zeitintervallbuchung(id=id, buchung=buchung, arbeitszeitkonto=arbeitszeitkonto, timestamp=timestamp)

            result.append(zeitintervallbuchung)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, buchung, arbeitszeitkonto, timestamp FROM zeitintervallbuchung WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, buchung, arbeitszeitkonto, timestamp) = tuples[0]
            zeitintervallbuchung = zeitintervallbuchung()
            id=id,
            buchung=buchung,
            arbeitszeitkonto=arbeitszeitkonto,
            timestamp=timestamp,
            result = zeitintervallbuchung
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
        

    def insert(self, zeitintervallbuchung: Zeitintervallbuchung) -> Zeitintervallbuchung:
        """Create activity Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM zeitintervallbuchung")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                zeitintervallbuchung.id = maxid[0] + 1
            else:
                zeitintervallbuchung.id = 1
        command = """
            INSERT INTO zeitintervallbuchung (
                id, arbeitszeitkonto, zeitintervall, zeitdifferenz, timestamp
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            zeitintervallbuchung.id,
            zeitintervallbuchung.arbeitszeitkonto,
            zeitintervallbuchung.zeitintervall,
            zeitintervallbuchung.zeitdifferenz,
            zeitintervallbuchung.timestamp,
        ))
        self._cnx.commit()

        return zeitintervallbuchung
    
    def update(self, zeitintervallbuchung: Zeitintervallbuchung) -> Zeitintervallbuchung:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param zeitintervallbuchung das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE zeitintervallbuchung SET buchung=%s, arbeitszeitkonto=%s, timestamp=%s WHERE id=%s"
        data = (zeitintervallbuchung.buchung, zeitintervallbuchung.timestamp)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitintervallbuchung

    def delete(self, zeitintervallbuchung):

        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitintervallbuchung WHERE id={}".format(zeitintervallbuchung.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()