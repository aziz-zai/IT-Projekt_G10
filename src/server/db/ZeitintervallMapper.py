from server.bo.ZeitintervallBO import Zeitintervall
from server.db.Mapper import Mapper


class ZeitintervallMapper(Mapper):

    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, bezeichnung, start, ende FROM zeitintervall WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, bezeichnung, start, ende) = tuples[0]
            zeitintervall = Zeitintervall()
            zeitintervall.set_id(id)
            zeitintervall.set_timestamp(timestamp)
            zeitintervall.set_bezeichnung(bezeichnung)
            zeitintervall.set_start(start)
            zeitintervall.set_ende(ende)
            result = zeitintervall
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
        
    
    def insert(self, zeitintervall: Zeitintervall) -> Zeitintervall:
        """Create activity Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM zeitintervall")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                zeitintervall.set_id(maxid[0] + 1)
            else:
                zeitintervall.set_id(1)
        command = """
            INSERT INTO zeitintervall (
                id, timestamp, bezeichnung, start, ende
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            zeitintervall.get_id(),
            zeitintervall.get_timestamp(),
            zeitintervall.get_bezeichnung(),
            zeitintervall.get_start(),
            zeitintervall.get_ende(),
        ))
        self._cnx.commit()

        return zeitintervall
    
    def update(self, zeitintervall: Zeitintervall) -> Zeitintervall:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param zeitintervall das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = """UPDATE zeitintervall SET 
        timestamp=%s, 
        bezeichnung=%s, 
        start=%s,
        ende=%s WHERE id=%s"""
        data = (zeitintervall.get_timestamp(),  
        zeitintervall.get_bezeichnung(),
        zeitintervall.get_start(),
        zeitintervall.get_ende(),
        zeitintervall.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return zeitintervall

    def delete(self, zeitintervall):

        cursor = self._cnx.cursor()

        command = "DELETE FROM zeitintervall WHERE id={}".format(zeitintervall.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()