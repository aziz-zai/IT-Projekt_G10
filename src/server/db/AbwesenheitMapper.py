from time import time
from server.bo.AbwesenheitBO import Abwesenheit
from server.db.Mapper import Mapper


class AbwesenheitMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, start, ende, abwesenheitsart FROM abwesenheit WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, start, ende, abwesenheitsart) = tuples[0]
            abwesenheit= Abwesenheit(
            id=id,
            timestamp=timestamp,
            start=start,
            ende=ende,
            abwesenheitsart=abwesenheitsart)

            result = abwesenheit

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

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
            start, ende, abwesenheitsart, timestamp, id
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            abwesenheit.start,
            abwesenheit.ende,
            abwesenheit.abwesenheitsart,
            abwesenheit.timestamp,
            abwesenheit.id,
        ))
        self._cnx.commit()

        return abwesenheit
    
    def update(self, abwesenheit: Abwesenheit) -> Abwesenheit:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param abwesenheit das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE abwesenheit SET start=%s, ende=%s, abwesenheitsart=%s, timestamp=%s WHERE id=%s"
        data = (abwesenheit.start, abwesenheit.ende, abwesenheit.abwesenheitsart, abwesenheit.timestamp, abwesenheit.id)
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