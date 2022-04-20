from time import time
from server.bo.UserBO import User
from server.db.Mapper import Mapper


class UserMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Kunde.

        :return Eine Sammlung mit Customer-Objekten, die sämtliche Kunden
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, timestamp, vorname, nachname, benutzername, email, google_user_id from user")
        tuples = cursor.fetchall()

        for (id, timestamp, vorname, nachname, benutzername, email, google_user_id) in tuples:
            user = User(id=id, timestamp=timestamp, vorname=vorname, nachname=nachname, benutzername=benutzername, email=email, google_user_id=google_user_id)

            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result
    
    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, vorname, nachname, benutzername, email, google_user_id FROM user WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, vorname, nachname, benutzername, email, google_user_id) = tuples[0]
            user = User(
            id=id,
            timestamp=timestamp,
            vorname=vorname,
            nachname=nachname,
            benutzername=benutzername,
            email=email,
            google_user_id=google_user_id)
            result = user
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, nachname):
        """Auslesen aller Benutzer anhand des Nachnamens.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, vorname, nachname, benutzername, email, google_user_id FROM user WHERE nachname LIKE '{}' ORDER BY nachname".format(nachname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, timestamp, vorname, nachname, benutzername, email, google_user_id) in tuples:
            user = User(
            id=id,
            timestamp=timestamp,
            vorname=vorname,
            nachname=nachname,
            benutzername=benutzername,
            email=email,
            google_user_id=google_user_id)    
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_google_user_id(self, google_user_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param google_user_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, vorname, nachname, benutzername, email, google_user_id FROM user WHERE google_user_id LIKE '{}' ORDER BY google_user_id".format(google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, vorname, nachname, benutzername, email, google_user_id) = tuples[0]
            user = User(
            id=id,
            timestamp=timestamp,
            vorname=vorname,
            nachname=nachname,
            benutzername=benutzername,
            email=email,
            google_user_id=google_user_id)
            result = user
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user: User) -> User:
        """Create user Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM user ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                user.id = maxid[0] + 1
            else:
                user.id = 1
        command = """
            INSERT INTO user (
                id, timestamp, vorname, nachname, benutzername, email, google_user_id
            ) VALUES (%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            user.id,
            user.timestamp,
            user.vorname,
            user.nachname,
            user.benutzername,
            user.email,
            user.google_user_id
        ))
        self._cnx.commit()

        return user
