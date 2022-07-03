
from server.bo.AbwesenheitBO import Abwesenheit
from server.bo.UserBO import User
from server.db.Mapper import Mapper



class UserMapper(Mapper):


    def __init__(self):
        super().__init__()

    def find_by_key(self, key):
        """
        Suchen eines Users anhand der User-ID.
        Parameter key = User-ID
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
        """
        Suchen eines Users anhand der Goole-User-ID.
        Parameter google_user_id = Google-User-ID
        """
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
    
    def find_potential_users(self, user_, project):
        """
        Suchen von potentiellen Usern für ein Projekt anhand der User-ID und der Projekt-ID.
        Parameter user_ = User-ID
        Parameter project = Projekt-ID
        """

        result = []

        cursor = self._cnx.cursor()
        command = """
        SELECT id, timestamp, vorname, nachname, benutzername, email, google_user_id
        FROM projectone.user
        WHERE id!=%s AND id NOT IN 
        (SELECT user FROM projectone.membership
        WHERE project = %s)
        """
        cursor.execute(command,(user_, project))
        tuples = cursor.fetchall()

        for (id, timestamp, vorname, nachname, benutzername, email, google_user_id) in tuples:
            user = User()
            user.set_id(id),
            user.set_timestamp(timestamp),
            user.set_vorname(vorname),
            user.set_nachname(nachname),
            user.set_benutzername(benutzername),
            user.set_email(email),
            user.set_google_user_id(google_user_id),
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result
    
    def update(self, user: User) -> User:
        """
        Änderung eines bereits bestehenden Users.
        Parameter user = UserBO, das geändert werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE user SET timestamp=%s, vorname=%s, nachname=%s, benutzername=%s, email=%s, google_user_id=%s, urlaubstage=%s WHERE id=%s"
        data = (user.get_timestamp(), user.get_vorname(), user.get_nachname(), user.get_benutzername(), user.get_email(), user.get_google_user_id(), user.get_urlaubstage(), user.get_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()


    def insert(self, user: User) -> User:
        """
        Einfügen eines neuen Users in die Datenbank.
        Parameter user = UserBO, das eingefügt werden soll
        """
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
        data = (user.get_id(), user.get_timestamp(), user.get_vorname(), user.get_nachname(), 
                user.get_benutzername(), user.get_email(), user.get_google_user_id(), user.get_urlaubstage())
        cursor.execute(command, data)

        self._cnx.commit()
        return user

    def delete(self, user):
        """
        Löschen eines Users aus der Datenbank anhand der User-ID.
        Parameter user = User-ID
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM user WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        