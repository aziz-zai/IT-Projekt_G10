
from server.bo.AbwesenheitBO import Abwesenheit
from server.bo.UserBO import User
from server.db.Mapper import Mapper



class UserMapper(Mapper):


    def __init__(self):
        super().__init__()

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
            user = User()
            user.set_id(id)
            user.set_timestamp(timestamp)
            user.set_vorname(vorname)
            user.set_nachname(nachname)
            user.set_benutzername(benutzername)
            user.set_email(email)
            user.set_google_user_id(google_user_id)

            result = user

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_google_user_id(self, google_user_id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, vorname, nachname, benutzername, email, google_user_id FROM user WHERE google_user_id LIKE '{}'".format(google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, vorname, nachname, benutzername, email, google_user_id) = tuples[0]
            user = User()
            user.set_id(id),
            user.set_timestamp(timestamp),
            user.set_vorname(vorname),
            user.set_nachname(nachname),
            user.set_benutzername(benutzername),
            user.set_email(email),
            user.set_google_user_id(google_user_id),
            result = user

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
    
    def update(self, user: User) -> User:
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param user das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE user SET timestamp=%s, vorname=%s, nachname=%s, benutzername=%s, email=%s, google_user_id=%s, urlaubstage=%s WHERE id=%s"
        data = (user.get_timestamp(), user.get_vorname(), user.get_nachname(), user.get_benutzername(), user.get_email(), user.get_google_user_id(), user.get_urlaubstage(), user.get_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()


    def insert(self, user: User) -> User:
        """Create user Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM user ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                user.set_id(maxid[0] + 1)
            else:
                user.set_id(1)
        command = """
            INSERT INTO user (
                id, timestamp, vorname, nachname, benutzername, email, google_user_id, urlaubstage
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
        """
        data = (user.get_id(), user.get_timestamp(),user.get_vorname(), user.get_nachname(), 
                user.get_benutzername(), user.get_email(), user.get_google_user_id(), user.get_urlaubstage())
        cursor.execute(command, data)

        self._cnx.commit()
        return user

    def delete(self, user):

        cursor = self._cnx.cursor()

        command = "DELETE FROM user WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        