from time import time
from server.bo.ArbeitszeitkontoBO import Arbeitszeitkonto
from server.db.Mapper import Mapper


class ArbeitszeitkontoMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Auslesen aller Arbeitszeitkonten aus der Datenbank
        :return Alle Arbeitszeitkonto-Objekte im System
        """
        result = []

        cursor = self._cnx.cursor()

        command = "SELECT id, timestamp, user, urlaubskonto, arbeitsleistung, gleitzeit FROM arbeitszeitkonto"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, timestamp, user, urlaubskonto, arbeitsleistung, gleitzeit) in tuples:
            arbeitszeitkonto = Arbeitszeitkonto()
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_timestamp(timestamp)
            arbeitszeitkonto.set_user(user)
            arbeitszeitkonto.set_urlaubskonto(urlaubskonto)
            arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
            arbeitszeitkonto.set_gleitzeit(gleitzeit)


            result.append(arbeitszeitkonto)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, user, urlaubskonto, arbeitsleistung, gleitzeit FROM arbeitszeitkonto WHERE user={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, user, urlaubskonto, arbeitsleistung, gleitzeit) = tuples[0]
            arbeitszeitkonto = Arbeitszeitkonto()
            
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_timestamp(timestamp)
            arbeitszeitkonto.set_user(user)
            arbeitszeitkonto.set_urlaubskonto(urlaubskonto)
            arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
            arbeitszeitkonto.set_gleitzeit(gleitzeit)
            
            result = arbeitszeitkonto
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_arbeitszeitkonto_by_userID(self, user: int):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param google_user_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, user, urlaubskonto, arbeitsleistung, gleitzeit FROM arbeitszeitkonto WHERE user={}".format(user)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, user, urlaubskonto, arbeitsleistung, gleitzeit) = tuples[0]
            arbeitszeitkonto = Arbeitszeitkonto()
            
            arbeitszeitkonto.set_id(id)
            arbeitszeitkonto.set_timestamp(timestamp)
            arbeitszeitkonto.set_user(user)
            arbeitszeitkonto.set_urlaubskonto(urlaubskonto)
            arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
            arbeitszeitkonto.set_gleitzeit(gleitzeit)
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

        command = "UPDATE arbeitszeitkonto SET timestamp=%s, user=%s, urlaubskonto=%s, arbeitsleistung=%s, gleitzeit=%s WHERE user=%s"
        data = (arbeitszeitkonto.get_timestamp(), arbeitszeitkonto.get_user(), arbeitszeitkonto.get_urlaubskonto(), arbeitszeitkonto.get_arbeitsleistung(), arbeitszeitkonto.get_gleitzeit(), arbeitszeitkonto.get_user())
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
                arbeitszeitkonto.set_id(maxid[0] + 1)
            else:
                arbeitszeitkonto.set_id(1)
        command = """
            INSERT INTO arbeitszeitkonto (
                id, timestamp, user, urlaubskonto, arbeitsleistung, gleitzeit
            ) VALUES (%s,%s,%s,%s,%s,%s)
        """
        data = (arbeitszeitkonto.get_id(), arbeitszeitkonto.get_timestamp(),arbeitszeitkonto.get_user(), arbeitszeitkonto.get_urlaubskonto(),
                arbeitszeitkonto.get_arbeitsleistung(),arbeitszeitkonto.get_gleitzeit())

        cursor.execute(command, data)
    
        self._cnx.commit()
        cursor.close()

        return arbeitszeitkonto

    def delete(self, arbeitszeitkonto):

        cursor = self._cnx.cursor()

        command = "DELETE FROM arbeitszeitkonto WHERE id={}".format(arbeitszeitkonto.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        