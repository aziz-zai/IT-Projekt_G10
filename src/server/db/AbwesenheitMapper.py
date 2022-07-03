from server.bo.AbwesenheitBO import Abwesenheit
from server.db.Mapper import Mapper


class AbwesenheitMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """
        Suchen einer Abwesenheit anhand der Abwesenheits-ID.
        Parameter key = Abwesenheits-ID

        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, start, ende, abwesenheitsart, bezeichnung FROM abwesenheit WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, start, ende, abwesenheitsart, bezeichnung) = tuples[0]
            abwesenheit = Abwesenheit()
            abwesenheit.set_id(id)
            abwesenheit.set_timestamp(timestamp)
            abwesenheit.set_start(start)
            abwesenheit.set_ende(ende)
            abwesenheit.set_abwesenheitsart(abwesenheitsart)
            abwesenheit.set_bezeichnung(bezeichnung)

            result = abwesenheit

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, abwesenheit: Abwesenheit) -> Abwesenheit:
        """
        Einfügen einer neuen Abwesenheit in die Datenbank.
        Parameter abwesenheit = AbwesenheitsBO, das eingefügt werden soll

        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM abwesenheit")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                abwesenheit.set_id(maxid[0] + 1)
            else:
                abwesenheit.set_id(1)
        command = """
            INSERT INTO abwesenheit (
            id, timestamp, start, ende, abwesenheitsart, bezeichnung 
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        data = (
            abwesenheit.get_id(),
            abwesenheit.get_timestamp(),
            abwesenheit.get_start(),
            abwesenheit.get_ende(),
            abwesenheit.get_abwesenheitsart(),
            abwesenheit.get_bezeichnung(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return abwesenheit

    def update(self, abwesenheit: Abwesenheit) -> Abwesenheit:
        """
        Änderung einer bereits bestehenden Abwesenheit.
        Parameter abwesenheit = AbwesenheitsBO, das geändert werden soll

        """
        cursor = self._cnx.cursor()

        command = "UPDATE abwesenheit SET timestamp=%s, start=%s, ende=%s, abwesenheitsart=%s, bezeichnung=%s WHERE id=%s"
        data = (
            abwesenheit.get_timestamp(),
            abwesenheit.get_id(),
            abwesenheit.get_start(),
            abwesenheit.get_ende(),
            abwesenheit.get_ende(),
            abwesenheit.get_abwesenheitsart(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return abwesenheit

    def delete(self, abwesenheit):
        """
        Löschen einer Abwesenheit aus der Datenbank anhand der Abwesenheits-ID.
        Parameter abwesenheit = Abwesenheits-ID

        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM abwesenheit WHERE id={}".format(abwesenheit.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
