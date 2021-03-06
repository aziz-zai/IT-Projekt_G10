from server.bo.PauseBO import Pause
from server.db.Mapper import Mapper


class PauseMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """
        Suchen eines Pause-Eintrags anhand der Pausen-ID.
        Parameter key = Pausen-ID
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, start, ende FROM pause WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, start, ende) = tuples[0]
            pause = Pause()
            pause.set_id(id)
            pause.set_timestamp(timestamp)
            pause.set_bezeichnung(bezeichnung)
            pause.set_start(start)
            pause.set_ende(ende)

            result = pause

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_beginn(self, beginn):
        """
        Suchen eines Pause-Eintrags anhand des Beginns.
        Parameter beginn = Pausenbeginn?
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, start, ende FROM pause WHERE start={}".format(
            beginn
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, start, ende) = tuples[0]
            pause = Pause()
            pause.set_id(id)
            pause.set_timestamp(timestamp)
            pause.set_bezeichnung(bezeichnung)
            pause.set_start(start)
            pause.set_ende(ende)

            result = pause

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, pause: Pause) -> Pause:
        """
        Einfügen eines neuen Pausen-Eintrags in die Datenbank.
        Parameter pause = PauseBO, das eingefügt werden soll
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM pause")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                pause.set_id(maxid[0] + 1)
            else:
                pause.set_id(1)
        command = """
            INSERT INTO pause (
                id, timestamp, bezeichnung, start, ende
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(
            command,
            (
                pause.get_id(),
                pause.get_timestamp(),
                pause.get_bezeichnung(),
                pause.get_start(),
                pause.get_ende(),
            ),
        )
        self._cnx.commit()

        return pause

    def update(self, pause: Pause) -> Pause:
        """
        Änderung eines bereits bestehenden Pausen-Eintrags.
        Parameter pause = PauseBO, das geändert werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE pause SET timestamp=%s, bezeichnung=%s, start=%s, ende=%s WHERE id=%s"
        data = (
            pause.get_timestamp(),
            pause.get_bezeichnung(),
            pause.get_start(),
            pause.get_ende(),
            pause.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return pause

    def delete(self, pause):
        """
        Löschen eines Pausen-Eintrags aus der Datenbank anhand der Pausen-ID.
        Parameter pause = Pausen-ID
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM pause WHERE id={}".format(pause.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
