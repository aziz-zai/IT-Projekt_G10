from server.bo.EreignisbuchungBo import Ereignisbuchung
from server.db.Mapper import Mapper


class EreignisbuchungMapper(Mapper):
    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """
        Suchen einer Ereignisbuchung anhand der Ereignisbuchungs-ID.
        Parameter key = Ereignisbuchungs-ID

        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, erstellt_von, erstellt_für, ist_buchung, ereignis, bezeichnung FROM ereignisbuchung WHERE id={}".format(
            key
        )
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (
                id,
                timestamp,
                erstellt_von,
                erstellt_für,
                ist_buchung,
                ereignis,
                bezeichnung,
            ) = tuples[0]
            ereignisbuchung = Ereignisbuchung()
            ereignisbuchung.set_id(id)
            ereignisbuchung.set_timestamp(timestamp)
            ereignisbuchung.set_erstellt_von(erstellt_von)
            ereignisbuchung.set_erstellt_für(erstellt_für)
            ereignisbuchung.set_ist_buchung(ist_buchung)
            ereignisbuchung.set_ereignis(ereignis)
            ereignisbuchung.set_bezeichnung(bezeichnung)

            result = ereignisbuchung
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_soll_ereignisbuchungen_by_user(self, erstellt_für):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,"""
        cursor = self._cnx.cursor()
        command = """SELECT id, timestamp, erstellt_von, erstellt_für, ist_buchung, ereignis, bezeichnung 
        FROM projectone.ereignisbuchung
        WHERE (erstellt_für={} OR erstellt_von={}) AND ist_buchung=False
        order by timestamp desc
        """.format(
            erstellt_für, erstellt_für
        )
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = []

        for (
            id,
            timestamp,
            erstellt_von,
            erstellt_für,
            ist_buchung,
            ereignis,
            bezeichnung,
        ) in tuples:
            ereignisbuchung = Ereignisbuchung()
            ereignisbuchung.set_id(id)
            ereignisbuchung.set_timestamp(timestamp)
            ereignisbuchung.set_erstellt_von(erstellt_von)
            ereignisbuchung.set_erstellt_für(erstellt_für)
            ereignisbuchung.set_ist_buchung(ist_buchung)
            ereignisbuchung.set_ereignis(ereignis)
            ereignisbuchung.set_bezeichnung(bezeichnung)
            result.append(ereignisbuchung)

        self._cnx.commit()
        cursor.close()

        return result

    def find_ist_ereignisbuchungen_by_user(self, erstellt_für):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,"""
        cursor = self._cnx.cursor()
        command = """SELECT id, timestamp, erstellt_von, erstellt_für, ist_buchung, ereignis, bezeichnung 
        FROM projectone.ereignisbuchung
        WHERE (erstellt_für={} OR erstellt_von={}) AND ist_buchung=True
        order by timestamp desc
        """.format(
            erstellt_für, erstellt_für
        )
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = []

        for (
            id,
            timestamp,
            erstellt_von,
            erstellt_für,
            ist_buchung,
            ereignis,
            bezeichnung,
        ) in tuples:
            ereignisbuchung = Ereignisbuchung()
            ereignisbuchung.set_id(id)
            ereignisbuchung.set_timestamp(timestamp)
            ereignisbuchung.set_erstellt_von(erstellt_von)
            ereignisbuchung.set_erstellt_für(erstellt_für)
            ereignisbuchung.set_ist_buchung(ist_buchung)
            ereignisbuchung.set_ereignis(ereignis)
            ereignisbuchung.set_bezeichnung(bezeichnung)
            result.append(ereignisbuchung)

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, ereignisbuchung: Ereignisbuchung) -> Ereignisbuchung:
        """
        Änderung einer bereits bestehenden Ereignisbuchung.
        Parameter ereignisbuchung = EreignisbuchungBO, das geändert werden soll

        """
        cursor = self._cnx.cursor()

        command = "UPDATE ereignisbuchung SET timestamp = %s, erstellt_von = %s, erstellt_für = %s, ist_buchung = %s, ereignis = %s, bezeichnung = %s WHERE id = %s"
        data = (
            ereignisbuchung.get_timestamp(),
            ereignisbuchung.get_erstellt_von(),
            ereignisbuchung.get_erstellt_für(),
            ereignisbuchung.get_ist_buchung(),
            ereignisbuchung.get_ereignis(),
            ereignisbuchung.get_bezeichnung(),
            ereignisbuchung.get_id(),
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignisbuchung

    def insert(self, ereignisbuchung: Ereignisbuchung) -> Ereignisbuchung:
        """
        Einfügen einer neuen Ereignisbuchung in die Datenbank.
        Parameter ereignisbuchung = EreignisbuchungBO, das eingefügt werden soll

        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM ereignisbuchung")
        tuples = cursor.fetchall()

        for maxid in tuples:
            if maxid[0] is not None:
                ereignisbuchung.set_id(maxid[0] + 1)
            else:
                ereignisbuchung.set_id(1)
        command = """
            INSERT INTO ereignisbuchung (
                id, timestamp, erstellt_von, erstellt_für, ist_buchung, ereignis, bezeichnung
            ) VALUES (%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(
            command,
            (
                ereignisbuchung.get_id(),
                ereignisbuchung.get_timestamp(),
                ereignisbuchung.get_erstellt_von(),
                ereignisbuchung.get_erstellt_für(),
                ereignisbuchung.get_ist_buchung(),
                ereignisbuchung.get_ereignis(),
                ereignisbuchung.get_bezeichnung(),
            ),
        )
        self._cnx.commit()

        return ereignisbuchung

    def delete(self, ereignisbuchung):
        """
        Löschen einer Ereignisbuchung aus der Datenbank anhand der Ereignisbuchungs-ID.
        Parameter ereignisbuchung = Ereignisbuchungs-ID

        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM ereignisbuchung WHERE id={}".format(
            ereignisbuchung.get_id()
        )
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
