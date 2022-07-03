from time import time
from server.bo.KommenBO import Kommen
from server.db.Mapper import Mapper


class KommenMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """
        Suchen eines Kommen-Eintrags anhand der Kommen-ID.
        Parameter key = Kommen-ID

        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, zeitpunkt, bezeichnung FROM kommen WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, zeitpunkt, bezeichnung) = tuples[0]
            kommen = Kommen()
            kommen.set_id(id)
            kommen.set_timestamp(timestamp)
            kommen.set_zeitpunkt(zeitpunkt)
            kommen.set_bezeichnung(bezeichnung)
            result = kommen
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, kommen: Kommen) -> Kommen:
        """
        Änderung eines bereits bestehenden Kommen-Eintrags.
        Parameter kommen = KommenBO, das geändert werden soll

        """
        cursor = self._cnx.cursor()

        command = "UPDATE kommen SET timestamp = %s, zeitpunkt = %s, bezeichnung = %s WHERE id=%s"
        data = (
            kommen.get_timestamp(),
            kommen.get_zeitpunkt(),
            kommen.get_bezeichnung(),
            kommen.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return kommen

    def insert(self, kommen: Kommen) -> Kommen:
        """
        Einfügen eines neuen Kommen-Eintrags in die Datenbank.
        Parameter kommen = KommenBO, das eingefügt werden soll

        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM kommen")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                kommen.set_id(maxid[0] + 1)
            else:
                kommen.set_id(1)
        command = """
            INSERT INTO kommen (
                id, timestamp, zeitpunkt, bezeichnung
            ) VALUES (%s,%s,%s,%s)
        """
        cursor.execute(
            command,
            (
                kommen.get_id(),
                kommen.get_timestamp(),
                kommen.get_zeitpunkt(),
                kommen.get_bezeichnung(),
            ),
        )
        self._cnx.commit()

        return kommen

    def delete(self, kommen):
        """
        Löschen eines Kommen-Eintrags aus der Datenbank anhand der Kommen-ID.
        Parameter kommen = Kommen-ID

        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM kommen WHERE id={}".format(kommen.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
