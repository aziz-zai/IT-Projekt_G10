from time import time
from server.bo.EreignisBO import Ereignis
from server.db.Mapper import Mapper


class EreignisMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Ereignises mit vorgegebener ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT timestamp, id, zeitpunkt, bezeichnung FROM ereignis WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (timestamp, id, zeitpunkt, bezeichnung) = tuples[0]
            ereignis = Ereignis(
            timestamp = timestamp,
            id = id,
            zeitpunkt = zeitpunkt,
            bezeichnung = bezeichnung)
            result = ereignis
            
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    
   
    
    """def update(self, ereignis: Ereignis) -> Ereignis:
        Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param ereignis das Objekt, das in die DB geschrieben werden soll
        
        cursor = self._cnx.cursor()

        command = "UPDATE ereignis SET timestamp = %s, zeitpunkt = %s, bezeichnung = %s WHERE id = %s"
        data = (ereignis.timestamp, ereignis.zeitpunkt, ereignis.bezeichnung, ereignis.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignis
    """
    def update(self, ereignis: Ereignis) -> Ereignis:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param arbeitszeitkonto das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE ereignis SET timestamp=%s, zeitpunkt=%s, bezeichnung=%s WHERE id=%s"
        data = (ereignis.timestamp, ereignis.zeitpunkt, ereignis.bezeichnung, ereignis.id)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return ereignis


    def insert(self, ereignis: Ereignis) -> Ereignis:
        """Create ereignis Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM ereignis")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                ereignis.id = maxid[0] + 1
            else:
                ereignis.id = 1
        command = """
            INSERT INTO ereignis (
                timestamp, id, zeitpunkt, bezeichnung
            ) VALUES (%s,%s,%s,%s)
        """
        cursor.execute(command, (
            ereignis.timestamp,
            ereignis.id,
            ereignis.zeitpunkt,
            ereignis.bezeichnung
        ))
        self._cnx.commit()

        return ereignis


    def delete(self, ereignis):

        cursor = self._cnx.cursor()

        command = "DELETE FROM ereignis WHERE id={}".format(ereignis.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        