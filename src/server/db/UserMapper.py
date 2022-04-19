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
        cursor.execute("SELECT id, timestamp, vorname, nachname, user_name, email, google_user_id from user")
        tuples = cursor.fetchall()

        for (id, timestamp, vorname, nachname) in tuples:
            user = User(id=id, timestamp=timestamp, vorname=vorname, nachname=nachname)

            result.append(user)
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
