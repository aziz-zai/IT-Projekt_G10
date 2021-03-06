from server.bo.AktivitätenBO import Aktivitäten
from server.db.Mapper import Mapper


class AktivitätenMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """
        Suchen einer Aktivität anhand der Aktivitäten-ID.
        Parameter key = Aktivitäten-ID

        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, dauer, capacity, project FROM activity WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, dauer, capacity, project) = tuples[0]
            aktivitäten = Aktivitäten()
            aktivitäten.set_id(id),
            aktivitäten.set_timestamp(timestamp),
            aktivitäten.set_bezeichnung(bezeichnung),
            aktivitäten.set_dauer(dauer),
            aktivitäten.set_capacity(capacity),
            aktivitäten.set_project(project)

            result = aktivitäten

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_activties_by_project(self, project: int):
        """
        Suchen aller Aktivitäten eines Projektes anhand der Projekt-ID.
        Parameter project = Projekt-ID

        """
        result = []

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, dauer, capacity, project FROM activity WHERE project={}".format(
            project
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, timestamp, bezeichnung, dauer, capacity, project) in tuples:
            aktivitäten = Aktivitäten()
            aktivitäten.set_id(id),
            aktivitäten.set_timestamp(timestamp),
            aktivitäten.set_bezeichnung(bezeichnung),
            aktivitäten.set_dauer(dauer),
            aktivitäten.set_capacity(capacity),
            aktivitäten.set_project(project)

            result.append(aktivitäten)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, aktivitäten: Aktivitäten) -> Aktivitäten:
        """
        Einfügen einer neuen Aktivität in die Datenbank.
        Parameter aktivitäten = AktivitätenBO, das eingefügt werden soll

        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM activity")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                aktivitäten.set_id(maxid[0] + 1)
            else:
                aktivitäten.set_id(1)
        command = """
            INSERT INTO activity (
                id, timestamp, bezeichnung, dauer, capacity, project
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        data = (
            aktivitäten.get_id(),
            aktivitäten.get_timestamp(),
            aktivitäten.get_bezeichnung(),
            aktivitäten.get_dauer(),
            aktivitäten.get_capacity(),
            aktivitäten.get_project(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return aktivitäten

    def update(self, aktivitäten: Aktivitäten) -> Aktivitäten:
        """
        Änderung einer bereits bestehenden Aktivität.
        Parameter aktivitäten = AktivitätenBO, das geändert werden soll

        """
        cursor = self._cnx.cursor()

        command = "UPDATE activity SET timestamp=%s, bezeichnung=%s, dauer=%s, capacity=%s, project=%s WHERE id=%s"
        data = (
            aktivitäten.get_timestamp(),
            aktivitäten.get_bezeichnung(),
            aktivitäten.get_dauer(),
            aktivitäten.get_capacity(),
            aktivitäten.get_project(),
            aktivitäten.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return aktivitäten

    def delete(self, aktivitäten):
        """
        Löschen einer Aktivität aus der Datenbank anhand der Aktivitäten-ID.
        Parameter aktivitäten = Aktivitäten-ID

        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM activity WHERE id={}".format(aktivitäten.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
