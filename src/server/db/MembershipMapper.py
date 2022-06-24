from time import time
from server.bo.MembershipBO import Membership
from server.bo.ProjectBO import Project
from server.bo.UserBO import User
from server.db.Mapper import Mapper


class MembershipMapper(Mapper):


    def __init__(self):
        super().__init__()
    
    def find_by_key(self, key):
        """
        Suchen eines Membership-Eintrags anhand der Membership-ID.
        Parameter key = Membership-ID
        """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, timestamp, user, project, projektleiter FROM membership WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, timestamp, user, project, projektleiter) = tuples[0]
            membership = Membership()
            membership.set_id(id)
            membership.set_timestamp(timestamp)
            membership.set_user(user)
            membership.set_project(project)
            membership.set_projektleiter(projektleiter)
            result = membership
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_members_by_project(self, project: int):
            """
            Suchen eines Memberships anhand der Projekt-ID.
            Parameter project = Projekt-ID
            """
            result = []

            cursor = self._cnx.cursor()
            command = """
            SELECT id, timestamp, vorname, nachname, email, benutzername, google_user_id from projectone.user
            WHERE id IN(
                SELECT user from projectone.membership
                WHERE project={} AND projektleiter=FALSE)""".format(project)
            cursor.execute(command)
            tuples = cursor.fetchall()

            for (id, timestamp, vorname, nachname, email, benutzername, google_user_id) in tuples:
                user = User()
                user.set_id(id)
                user.set_timestamp(timestamp)
                user.set_vorname(vorname)
                user.set_nachname(nachname)
                user.set_email(email)
                user.set_benutzername(benutzername)
                user.set_google_user_id(google_user_id)
                result.append(user)

            self._cnx.commit()
            cursor.close()

            return result

    def find_projektleiter_by_project(self, project: int):
            """
            Suchen eines Projektleiters anhand der Projekt-ID.
            Parameter project = Projekt-ID
            """
            result = None

            cursor = self._cnx.cursor()
            command = """
            SELECT id, timestamp, vorname, nachname, email, benutzername, google_user_id from projectone.user
            WHERE id IN(
                SELECT user from projectone.membership
                WHERE project={} AND projektleiter=TRUE)""".format(project)
            cursor.execute(command)
            tuples = cursor.fetchall()

            try:
                (id, timestamp, vorname, nachname, email, benutzername, google_user_id) = tuples[0]
                user = User()
                user.set_id(id)
                user.set_timestamp(timestamp)
                user.set_vorname(vorname)
                user.set_nachname(nachname)
                user.set_email(email)
                user.set_benutzername(benutzername)
                user.set_google_user_id(google_user_id)
                result = user
            except IndexError:
                """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
                keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
                result = None
            self._cnx.commit()
            cursor.close()

            return result

    def find_by_user(self, user: int):
            """
            Suchen eines Memberships anhand der User-ID.
            Parameter user = User-ID
            """
            result = []

            cursor = self._cnx.cursor()
            command = """
            SELECT id, timestamp, projektname, auftraggeber, laufzeit, availablehours from projectone.project
            WHERE id IN(
                SELECT project from projectone.membership
                WHERE user={})""".format(user)
            cursor.execute(command)
            tuples = cursor.fetchall()

            for (id, timestamp, projektname, auftraggeber, laufzeit, availablehours ) in tuples:
                project = Project()
                project.set_id(id)
                project.set_timestamp(timestamp)
                project.set_projektname(projektname)
                project.set_auftraggeber(auftraggeber)
                project.set_laufzeit(laufzeit)
                project.set_availablehours(availablehours)
                
                result.append(project)

            self._cnx.commit()
            cursor.close()

            return result

    def find_by_user_and_project(self, user: int, project: int):
            """
            Suchen eines Memberships anhand der User-ID und der Projekt-ID.
            Parameter user = User-ID
            Parameter project = Projekt-ID
            """
        
            result=None
            cursor = self._cnx.cursor()
            command = "SELECT id, timestamp, user, project, projektleiter from membership WHERE user=%s AND project=%s"
            cursor.execute(command, (user, project))
            tuples = cursor.fetchall()

            try: 
                (id, timestamp, user, project, projektleiter) = tuples[0]
                membership = Membership()
                membership.set_id(id),
                membership.set_timestamp(timestamp),
                membership.set_user(user),
                membership.set_project(project),
                membership.set_projektleiter(projektleiter),
                result=membership   
            except IndexError:
                """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
                keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
                result = None

            self._cnx.commit()
            cursor.close()

            return result

    def update(self, membership: Membership) -> Membership:
        """
        Änderung eines bereits bestehenden Memberships.
        Parameter membership = MembershipBO, das geändert werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE membership SET timestamp = %s, user = %s, project = %s, projektleiter = %s WHERE id=%s"
        data = (membership.get_timestamp(), membership.get_user(), membership.get_project(), membership.get_projektleiter(), membership.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return membership


    def insert(self, membership: Membership) -> Membership:
        """
        Einfügen eines neuen Memberships in die Datenbank.
        Parameter membership = MembershipBO, das eingefügt werden soll
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM membership")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                membership.set_id(maxid[0] + 1)
            else:
                membership.set_id(1)
        command = """
            INSERT INTO membership (
                id, timestamp, user, project, projektleiter
            ) VALUES (%s,%s,%s,%s,%s)
        """
        data = (membership.get_id(), membership.get_timestamp(), membership.get_user(), membership.get_project(), membership.get_projektleiter())
        cursor.execute(command, data)
        
        self._cnx.commit()

        return membership

    def delete(self, membership):
        """
        Löschen eines Memberships aus der Datenbank anhand der Membership-ID.
        Parameter membership = Membership-ID
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM membership WHERE id={}".format(membership.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
        