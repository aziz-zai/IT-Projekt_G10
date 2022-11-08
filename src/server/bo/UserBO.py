from .BusinessObject import BusinessObject

"""
Klasse User mit einfachen Methoden zum Setzen der Klassenvariablen

"""


class User(BusinessObject):
    def __init__(self):
        super().__init__()
        self._vorname = ""
        self._nachname = ""
        self._benutzername = ""
        self._email = ""
        self._google_user_id = None
        self._urlaubstage = 20

    def get_vorname(self):
        """Auslesen des Vornamen"""
        return self._vorname

    def set_vorname(self, vorname):
        """Setzen des Vornamen"""
        self._vorname = vorname

    def get_nachname(self):
        """Auslesen des Nachnamen"""
        return self._nachname

    def set_nachname(self, nachname):
        """Setzen des Nachnamen"""
        self._nachname = nachname

    def get_benutzername(self):
        """Auslesen des Benutzernamen"""
        return self._benutzername

    def set_benutzername(self, benutzername):
        """Setzen des Benutzernamen"""
        self._benutzername = benutzername

    def get_email(self):
        """Auslesen der E-Mail"""
        return self._email

    def set_email(self, email):
        """Setzen der E-Mail"""
        self._email = email

    def get_google_user_id(self):
        """Auslesen der Google-User-ID"""
        return self._google_user_id

    def set_google_user_id(self, google_user_id):
        """Setzen der Google-User-ID"""
        self._google_user_id = google_user_id

    def get_urlaubstage(self):
        """Auslesen der Urlaubstage"""
        return self._urlaubstage

    def set_urlaubstage(self, urlaubstage):
        self._urlaubstage = urlaubstage
    

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}, {}, {}, {}, {}, {}, {}".format(
            self.get_id(),
            self.get_timestamp(),
            self.get_vorname(),
            self.get_nachname(),
            self.get_benutzername(),
            self.get_email(),
            self.get_google_user_id(),
            self.get_urlaubstage(),
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein User()."""
        obj = User()
        obj.set_vorname(dictionary["vorname"])
        obj.set_nachname(dictionary["nachname"])
        obj.set_benutzername(dictionary["benutzername"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])

        return obj
