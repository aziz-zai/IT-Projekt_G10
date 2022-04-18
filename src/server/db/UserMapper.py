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

        for (id, timestamp, vorname, nachname, user_name, email, google_user_id ) in tuples:
            user = User(id_=id, timestamp_=timestamp, vorname=vorname, nachname=nachname, user_name=user_name, email=email, google_user_id=google_user_id)
            result.append(user)
        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM users ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                user.set_id(maxid[0] + 1)
            else:
                user.set_id(1)

        command = "INSERT INTO users (id, vorname, nachname, email, google_user_id) VALUES (%s,%s,%s,%s,%s,%s)"
        data = (user.get_id(), user.get_vorname(), user.get_nachname(), user.get_user_name(), user.get_email(), user.get_google_user_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user
