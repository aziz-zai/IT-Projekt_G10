from time import time
from server.bo.EreignisBO import Ereignis
from server.db.Mapper import Mapper


class EreignisMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """
        Suchen eines Ereignisses anhand der Ereignis-ID.
        Parameter key = Ereignis-ID

        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT timestamp, id, zeitpunkt, bezeichnung FROM ereignis WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (timestamp, id, zeitpunkt, bezeichnung) = tuples[0]
            ereignis = Ereignis()
            ereignis.set_id(id)
            ereignis.set_timestamp(timestamp)
            ereignis.set_zeitpunkt(zeitpunkt)
            ereignis.set_bezeichnung(bezeichnung)
            result = ereignis

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, ereignis: Ereignis) -> Ereignis:
        """
        Änderung eines bereits bestehenden Ereignisses.
        Parameter ereignis = EreignisBO, das geändert werden soll

        """
        cursor = self._cnx.cursor()

        command = (
            "UPDATE ereignis SET timestamp=%s, zeitpunkt=%s, bezeichnung=%s WHERE id=%s"
        )
        data = (
            ereignis.get_timestamp(),
            ereignis.get_zeitpunkt(),
            ereignis.get_bezeichnung(),
            ereignis.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignis

    def insert(self, ereignis: Ereignis) -> Ereignis:
        """
        Einfügen eines neuen Ereignisses in die Datenbank.
        Parameter ereignis = EreignisBO, das eingefügt werden soll

        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM ereignis")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                ereignis.set_id(maxid[0] + 1)
            else:
                ereignis.set_id(1)
        command = """
            INSERT INTO ereignis (
                timestamp, id, zeitpunkt, bezeichnung
            ) VALUES (%s,%s,%s,%s)
        """
        data = (
            ereignis.get_timestamp(),
            ereignis.get_id(),
            ereignis.get_zeitpunkt(),
            ereignis.get_bezeichnung(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        return ereignis

    def delete(self, ereignis):
        """
        Löschen eines Ereignisses aus der Datenbank anhand der Ereignis-ID.
        Parameter ereignis = Ereignis-ID

        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM ereignis WHERE id={}".format(ereignis.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
