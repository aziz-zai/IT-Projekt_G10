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
        command = "SELECT id, timestamp, erstellt_von, erstellt_für, ist_buchung, zeitintervall, bezeichnung, zeitdifferenz FROM zeitintervallbuchung WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, erstellt_von, erstellt_für, ist_buchung, zeitintervall, bezeichnung,zeitdifferenz) = tuples[0]
            zeitintervallbuchung = Zeitintervallbuchung()
            zeitintervallbuchung.set_id(id)
            zeitintervallbuchung.set_timestamp(timestamp)
            zeitintervallbuchung.set_erstellt_von(erstellt_von)
            zeitintervallbuchung.set_erstellt_für(erstellt_für)
            zeitintervallbuchung.set_ist_buchung(ist_buchung)
            zeitintervallbuchung.set_zeitintervall(zeitintervall)
            zeitintervallbuchung.set_bezeichnung(bezeichnung)
            zeitintervallbuchung.set_zeitdifferenz(zeitdifferenz)
    
            result = zeitintervallbuchung
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
        
    def find_soll_buchungen_by_user(self, erstellt_für):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """
        cursor = self._cnx.cursor()
        command = """SELECT id, timestamp, erstellt_von, erstellt_für, ist_buchung,zeitintervall, bezeichnung, zeitdifferenz 
        FROM projectone.zeitintervallbuchung
        WHERE erstellt_für={} AND ist_buchung=FALSE AND bezeichnung='Projektarbeit'
        """.format(erstellt_für)
        cursor.execute(command)
        tuples = cursor.fetchall()
        result= []

        
        for (id, timestamp, erstellt_von, erstellt_für, ist_buchung, zeitintervall, bezeichnung, zeitdifferenz) in tuples:
            zeitintervallbuchung = Zeitintervallbuchung()
            zeitintervallbuchung.set_id(id)
            zeitintervallbuchung.set_timestamp(timestamp)
            zeitintervallbuchung.set_erstellt_von(erstellt_von)
            zeitintervallbuchung.set_erstellt_für(erstellt_für)
            zeitintervallbuchung.set_ist_buchung(ist_buchung)
            zeitintervallbuchung.set_zeitintervall(zeitintervall)
            zeitintervallbuchung.set_bezeichnung(bezeichnung)
            zeitintervallbuchung.set_zeitdifferenz(zeitdifferenz)
            result.append(zeitintervallbuchung)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_ist_buchungen_by_user(self, user):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """
        cursor = self._cnx.cursor()
        command = """SELECT id, timestamp, erstellt_von, erstellt_für, ist_buchung,zeitintervall, bezeichnung, zeitdifferenz 
        FROM projectone.zeitintervallbuchung
        WHERE erstellt_für={} AND ist_buchung=TRUE AND bezeichnung='Projektarbeit'
        """.format(user)
        cursor.execute(command)
        tuples = cursor.fetchall()
        result= []  

        
        for (id, timestamp, erstellt_von, erstellt_für, ist_buchung, zeitintervall, bezeichnung, zeitdifferenz) in tuples:
            zeitintervallbuchung = Zeitintervallbuchung()
            zeitintervallbuchung.set_id(id)
            zeitintervallbuchung.set_timestamp(timestamp)
            zeitintervallbuchung.set_erstellt_von(erstellt_von)
            zeitintervallbuchung.set_erstellt_für(erstellt_für)
            zeitintervallbuchung.set_ist_buchung(ist_buchung)
            zeitintervallbuchung.set_zeitintervall(zeitintervall)
            zeitintervallbuchung.set_bezeichnung(bezeichnung)
            zeitintervallbuchung.set_zeitdifferenz(zeitdifferenz)
            result.append(zeitintervallbuchung)

        self._cnx.commit()
        cursor.close()

        return result

    def find_pause_buchungen_by_user(self, user):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """
        cursor = self._cnx.cursor()
        command = """SELECT id, timestamp, erstellt_von, erstellt_für, ist_buchung,zeitintervall, bezeichnung, zeitdifferenz 
        FROM projectone.zeitintervallbuchung
        WHERE erstellt_für={} AND ist_buchung=TRUE AND bezeichnung='Pause'
        """.format(user)
        cursor.execute(command)
        tuples = cursor.fetchall()
        result= []  

        
        for (id, timestamp, erstellt_von, erstellt_für, ist_buchung, zeitintervall, bezeichnung, zeitdifferenz) in tuples:
            zeitintervallbuchung = Zeitintervallbuchung()
            zeitintervallbuchung.set_id(id)
            zeitintervallbuchung.set_timestamp(timestamp)
            zeitintervallbuchung.set_erstellt_von(erstellt_von)
            zeitintervallbuchung.set_erstellt_für(erstellt_für)
            zeitintervallbuchung.set_ist_buchung(ist_buchung)
            zeitintervallbuchung.set_zeitintervall(zeitintervall)
            zeitintervallbuchung.set_bezeichnung(bezeichnung)
            zeitintervallbuchung.set_zeitdifferenz(zeitdifferenz)
            result.append(zeitintervallbuchung)

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
                zeitintervallbuchung.set_id(maxid[0] + 1)
            else:
                zeitintervallbuchung.set_id(1)
        command = """
            INSERT INTO zeitintervallbuchung (
                id, timestamp, erstellt_von, erstellt_für, ist_buchung, zeitintervall, zeitdifferenz, bezeichnung
            ) VALUES (%s,%s,%s,%s,%s,%s,%s, %s)
        """
        cursor.execute(command, (
            zeitintervallbuchung.get_id(),
            zeitintervallbuchung.get_timestamp(),
            zeitintervallbuchung.get_erstellt_von(),
            zeitintervallbuchung.get_erstellt_für(),
            zeitintervallbuchung.get_ist_buchung(),
            zeitintervallbuchung.get_zeitintervall(),
            zeitintervallbuchung.get_zeitdifferenz(),
            zeitintervallbuchung.get_bezeichnung()
        ))
        self._cnx.commit()

        return zeitintervallbuchung
    
    def update(self, zeitintervallbuchung: Zeitintervallbuchung) -> Zeitintervallbuchung:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param zeitintervallbuchung das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = """UPDATE zeitintervallbuchung SET 
        timestamp=%s, 
        erstellt_von=%s, 
        erstellt_für=%s, 
        ist_buchung=%s, 
        zeitintervall=%s, 
        bezeichnung=%s, 
        zeitdifferenz=%s WHERE id=%s"""
        data = (zeitintervallbuchung.get_timestamp(), 
        zeitintervallbuchung.get_erstellt_von(), 
        zeitintervallbuchung.get_erstellt_für(), 
        zeitintervallbuchung.get_ist_buchung(), 
        zeitintervallbuchung.get_zeitintervall(), 
        zeitintervallbuchung.get_zeitdifferenz(), 
        zeitintervallbuchung.get_bezeichnung(),
        zeitintervallbuchung.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitintervallbuchung

    def delete(self, zeitintervallbuchung):

        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitintervallbuchung WHERE id={}".format(zeitintervallbuchung.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()