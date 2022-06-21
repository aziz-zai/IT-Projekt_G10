from time import time
from server.bo.ArbeitszeitkontoBO import Arbeitszeitkonto
from server.db.Mapper import Mapper


class ArbeitszeitkontoMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Suchen aller Arbeitszeitkonten

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
        """
        Suchen eines Arbeitszeitkontos anhand der Arbeitszeitkonto-ID.
        Parameter key = Arbeitszeitkonto-ID

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
        """
        Suchen eines Arbeitszeitkontos anhand der User-ID.
        Parameter user = User-ID

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
        """
        Änderung eines bereits bestehenden Arbeitszeitkontos.
        Parameter arbeitszeitkonto = ArbeitszeitkontoBO, das geändert werden soll
        
        """
        cursor = self._cnx.cursor()

        command = "UPDATE arbeitszeitkonto SET timestamp=%s, user=%s, urlaubskonto=%s, arbeitsleistung=%s, gleitzeit=%s WHERE user=%s"
        data = (arbeitszeitkonto.get_timestamp(), arbeitszeitkonto.get_user(), arbeitszeitkonto.get_urlaubskonto(), arbeitszeitkonto.get_arbeitsleistung(), arbeitszeitkonto.get_gleitzeit(), arbeitszeitkonto.get_user())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return arbeitszeitkonto


    def insert(self, arbeitszeitkonto: Arbeitszeitkonto) -> Arbeitszeitkonto:
        """
        Einfügen eines neuen Arbeitszeitkontos in die Datenbank.
        Parameter arbeitszeitkonto = ArbeitszeitkontoBO, das eingefügt werden soll

        """
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
        """
        Löschen eines Arbeitszeitkontos aus der Datenbank anhand der Arbeitszeitkonto-ID.
        Parameter arbeitszeitkonto = Arbeitszeitkonto-ID
        
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM arbeitszeitkonto WHERE id={}".format(arbeitszeitkonto.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        