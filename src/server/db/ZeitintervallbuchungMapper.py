from sqlite3 import Timestamp
from time import time
from server.bo.ZeitintervallbuchungBO import Zeitintervallbuchung
from server.db.Mapper import Mapper


class ZeitintervallbuchungMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, zeitintervall, zeitdifferenz, erstellt_von, erstellt_für, ist_buchung, timestamp FROM zeitintervallbuchung WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, zeitintervall, zeitdifferenz, erstellt_von, erstellt_für, ist_buchung, timestamp) = tuples[0]
            zeitintervallbuchung = Zeitintervallbuchung(
            id=id,
            zeitintervall=zeitintervall,
            zeitdifferenz=zeitdifferenz,
            erstellt_von=erstellt_von,
            erstellt_für=erstellt_für,
            ist_buchung=ist_buchung,
            timestamp=timestamp)
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
                id, zeitintervall, zeitdifferenz, ist_buchung, erstellt_von, erstellt_für, timestamp
            ) VALUES (%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            zeitintervallbuchung.id,
            zeitintervallbuchung.zeitintervall,
            zeitintervallbuchung.zeitdifferenz,
            zeitintervallbuchung.ist_buchung,
            zeitintervallbuchung.erstellt_von,
            zeitintervallbuchung.erstellt_für,
            zeitintervallbuchung.timestamp,
        ))
        self._cnx.commit()

        return zeitintervallbuchung
    
    def update(self, zeitintervallbuchung: Zeitintervallbuchung) -> Zeitintervallbuchung:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param zeitintervallbuchung das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE zeitintervallbuchung SET zeitintervall=%s, zeitdifferenz=%s, ist_buchung=%s, erstellt_von=%s, erstellt_für=%s, timestamp=%s WHERE id=%s"
        data = (zeitintervallbuchung.zeitintervall, zeitintervallbuchung.zeitdifferenz, zeitintervallbuchung.ist_buchung, zeitintervallbuchung.erstellt_von, zeitintervallbuchung.erstellt_für, zeitintervallbuchung.timestamp)
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