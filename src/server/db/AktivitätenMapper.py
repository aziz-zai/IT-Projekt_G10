from time import time
from server.bo.AktivitätenBO import Aktivitäten
from server.db.Mapper import Mapper


class AktivitätenMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Kunde.

        :return Eine Sammlung mit Customer-Objekten, die sämtliche Kunden
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, bezeichnung, dauer, kapazität from activity")
        tuples = cursor.fetchall()

        for (id, timestamp, bezeichnung, dauer, kapazität) in tuples:
            Aktivitäten = Aktivitäten(id=id, timestamp=timestamp, bezeichnung=bezeichnung, dauer=dauer, kapazität = kapazität)

            result.append(Aktivitäten)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, dauer, kapazität FROM user WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, dauer, kapazität) = tuples[0]
            aktivitäten = aktivitäten()
            id=id,
            timestamp=timestamp,
            bezeichnung=bezeichnung
            dauer=dauer,
            kapazität=kapazität,
            result = aktivitäten
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_bezeichnung(self, bezeichnung):
        """Auslesen aller Aktivitäten anhand der bezeichnung.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, dauer, kapazität FROM user WHERE bezeichnung LIKE '{}' ORDER BY bezeichnung".format(bezeichnung)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, timestamp, bezeichnung, dauer, kapazität) in tuples:
            aktivitäten = aktivitäten
            id=id,
            timestamp=timestamp,
            bezeichnung=bezeichnung,
            dauer=dauer,
            kapazität=kapazität 
            result.append(aktivitäten)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_dauer(self, dauer):
    
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, dauer, kapazität FROM user WHERE dauer LIKE '{}' ORDER BY dauer".format(dauer)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, timestamp, bezeichnung, dauer, kapazität) in tuples:
            aktivitäten = aktivitäten(
            id=id,
            timestamp=timestamp,
            bezeichnung=bezeichnung,
            dauer=dauer,
            kapazität=kapazität)
            result = aktivitäten    
            result.append(aktivitäten)

        self._cnx.commit()
        cursor.close()

        return result
        

    def insert(self, aktivitäten: Aktivitäten) -> Aktivitäten:
        """Create user Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM aktivitäten")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                aktivitäten.id = maxid[0] + 1
            else:
                aktivitäten.id = 1
        command = """
            INSERT INTO activity (
                id, timestamp, bezeichnung, dauer, activity
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            aktivitäten.id,
            aktivitäten.timestamp,
            aktivitäten.bezeichnung,
            aktivitäten.dauer,
            aktivitäten.capacity,
        ))
        self._cnx.commit()

        return aktivitäten
    
    def update(self, aktivitäten: Aktivitäten) -> Aktivitäten:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE aktivitäten SET timestamp=%s, bezeichnung=%s, dauer=%s, activity=%s WHERE id=%s"
        data = (aktivitäten.timestamp, aktivitäten.bezeichnung, aktivitäten.dauer, aktivitäten.kapazität)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return aktivitäten

    def delete(self, aktivitäten):

        cursor = self._cnx.cursor()

        command = "DELETE FROM activity WHERE id={}".format(aktivitäten.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()