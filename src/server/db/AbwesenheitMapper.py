from sqlite3 import Timestamp
from time import time
from server.bo.AbwesenheitBO import Abwesenheit
from server.db.Mapper import Mapper


class AbwesenheitMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, abwesenheitsart, timestamp, zeitintervallID, bemerkung from abwesenheit")
        tuples = cursor.fetchall()

        for (id, abwesenheitsart, timestamp, zeitintervallID, bemerkung) in tuples:
            Abwesenheit = Abwesenheit(id=id, abwesenheitsart=abwesenheitsart, timestamp=timestamp, zeitintervallID=zeitintervallID, bemerkung=bemerkung)

            result.append(Abwesenheit)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT abwesenheitID, abwesenheitsart, timestamp, zeitintervallID, bemerkung FROM abwesenheit WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, abwesenheitsart, timestamp, zeitintervallID, bemerkung) = tuples[0]
            abwesenheit = Abwesenheit()
            id=id,
            abwesenheitsart=abwesenheitsart,
            timestamp=timestamp,
            zeitintervallID=zeitintervallID,
            bemerkung=bemerkung,
            result = abwesenheit
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_bemerkung(self, bemerkung):
        """Auslesen aller Abwesenheiten anhand der bemerkung.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, zeitintervallID, bemerkung FROM Abwesenheit WHERE bemerkung LIKE '{}' ORDER BY bemerkung".format(bemerkung)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, abwesenheitsart, timestamp, zeitintervallID, bemerkung) in tuples:
            Abwesenheit = Abwesenheit
            id=id,
            abwesenheitsart=abwesenheitsart
            timestamp=timestamp,
            zeitintervallID=zeitintervallID,
            bemerkung=bemerkung, 
            result.append(Abwesenheit)

        self._cnx.commit()
        cursor.close()

        return result
    
    
    def insert(self, abwesenheit: Abwesenheit) -> Abwesenheit:
        """Create Abwesenheit Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM abwesenheit")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                abwesenheit.id = maxid[0] + 1
            else:
                abwesenheit.id = 1
        command = """
            INSERT INTO abwesenheit (
            id, abwesenheitsart, timestamp, zeitintervallID, bemerkung
            ) VALUES (%s,%s,%s,%s,%s,)
        """
        cursor.execute(command, (
            abwesenheit.id,
            abwesenheit.abwesenheitsart,
            abwesenheit.timestamp,
            abwesenheit.zeitintervallID,
            abwesenheit.bemerkung,
        ))
        self._cnx.commit()

        return abwesenheit
    
    def update(self, abwesenheit: Abwesenheit) -> Abwesenheit:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param abwesenheit das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE abwesenheit SET abwesenheitsart=%s, timestamp=%s, zeitintervallID=%s, bemerkung=%s WHERE id=%s"
        data = (abwesenheit.abwesenheitsart, abwesenheit.timestamp, abwesenheit.zeitintervallID, abwesenheit.bemerkung)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return abwesenheit

    def delete(self, abwesenheit):

        cursor = self._cnx.cursor()

        command = "DELETE FROM abwesenheit WHERE id={}".format(abwesenheit.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()