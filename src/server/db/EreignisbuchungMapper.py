from time import time
from server.bo.EreignisbuchungBO import Ereignisbuchung
from server.db.Mapper import Mapper


class EreignisbuchungMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Ereignisbuchungen.

        :return Eine Sammlung mit Ereignisbuchung-Objekten, die sämtliche Ereignisbuchungen
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, benutzer, buchung, user, arbeitszeitkonto from eregnisbuchung")
        tuples = cursor.fetchall()

        for (id, timestamp, benutzer, buchung, user, arbeitszeitkonto) in tuples:
            ereignisbuchung = Ereignisbuchung(id = id, timestamp = timestamp, benutzer = benutzer, buchung = buchung,  arbeitszeitkonto = arbeitszeitkonto)

            result.append(ereignisbuchung)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen einer Ereignisbuchung mit vorgegebener ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, benutzer, buchung, user, arbeitszeitkonto FROM ereignisbuchung WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, benutzer, buchung, user, arbeitszeitkonto) = tuples[0]
            ereignisbuchung = Ereignisbuchung(
            id = id,
            timestamp = timestamp,
            benutzer = benutzer,
            buchung = buchung,
            user = user,
            arbeitszeitkonto = arbeitszeitkonto)
            result = ereignisbuchung
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    
   
    
    def update(self, ereignisbuchung: Ereignisbuchung) -> Ereignisbuchung:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param ereignisbuchung das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE ereignisbuchung SET timestamp = %s, user = %s, benutzer = %s, buchung = %s, arbeitszeitkonto = %s WHERE id = %s"
        data = (ereignisbuchung.timestamp, ereignisbuchung.benutzer, ereignisbuchung.buchung, ereignisbuchung.user, ereignisbuchung.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignisbuchung


    def insert(self, ereignisbuchung: Ereignisbuchung) -> Ereignisbuchung:
        """Create ereignisbuchung Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM ereignisbuchung")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                ereignisbuchung.id = maxid[0] + 1
            else:
                ereignisbuchung.id = 1
        command = """
            INSERT INTO ereignisbuchung (
                id, timestamp, benutzer, buchung, user, arbeitszeitkonto
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            ereignisbuchung.id,
            ereignisbuchung.timestamp,
            ereignisbuchung.benutzer,
            ereignisbuchung.user,
            ereignisbuchung.arbeitszeitkonto,
            ereignisbuchung.buchung,
        ))
        self._cnx.commit()

        return ereignisbuchung


    def delete(self, ereignisbuchung):

        cursor = self._cnx.cursor()

        command = "DELETE FROM ereignisbuchung WHERE id={}".format(ereignisbuchung.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        