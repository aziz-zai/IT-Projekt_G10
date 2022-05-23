from time import time
from server.bo.ArbeitszeitkontoBO import Arbeitszeitkonto
from server.db.Mapper import Mapper


class ArbeitszeitkontoMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, user, urlaubskonto, arbeitsleistung, überstunden FROM arbeitszeitkonto WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, user, urlaubskonto, arbeitsleistung, überstunden) = tuples[0]
            arbeitszeitkonto = Arbeitszeitkonto(
            id=id,
            timestamp=timestamp,
            user=user,
            urlaubskonto=urlaubskonto,
            arbeitsleistung=arbeitsleistung,
            überstunden=überstunden
            )
            result = arbeitszeitkonto
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_arbeitszeitkonto_by_userID(self, userID):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param google_user_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, user, urlaubskonto, arbeitsleistung, überstunden FROM arbeitszeitkonto WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, user, urlaubskonto, arbeitsleistung, überstunden) = tuples[0]
            arbeitszeitkonto = Arbeitszeitkonto(
            id=id,
            timestamp=timestamp,
            user=user,
            urlaubskonto=urlaubskonto,
            arbeitsleistung=arbeitsleistung,
            überstunden=überstunden
            )
            result = arbeitszeitkonto

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    
    def update(self, arbeitszeitkonto: Arbeitszeitkonto) -> Arbeitszeitkonto:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param arbeitszeitkonto das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE arbeitszeitkonto SET timestamp=%s, user=%s, urlaubskonto=%s, arbeitsleistung=%s, überstunden=%s WHERE id=%s"
        data = (arbeitszeitkonto.timestamp, arbeitszeitkonto.urlaubstage, arbeitszeitkonto.user)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return arbeitszeitkonto


    def insert(self, arbeitszeitkonto: Arbeitszeitkonto) -> Arbeitszeitkonto:
        """Create arbeitszeitkonto Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM arbeitszeitkonto ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                arbeitszeitkonto.id = maxid[0] + 1
            else:
                arbeitszeitkonto.id = 1
        command = """
            INSERT INTO arbeitszeitkonto (
                id, timestamp, user, urlaubskonto, arbeitsleistung, überstunden
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            arbeitszeitkonto.id,
            arbeitszeitkonto.timestamp,
            arbeitszeitkonto.user,
            arbeitszeitkonto.urlaubskonto,
            arbeitszeitkonto.arbeitsleistung,
            arbeitszeitkonto.überstunden
        ))
        self._cnx.commit()

        return arbeitszeitkonto

    def delete(self, arbeitszeitkonto):

        cursor = self._cnx.cursor()

        command = "DELETE FROM arbeitszeitkonto WHERE id={}".format(arbeitszeitkonto.id)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        