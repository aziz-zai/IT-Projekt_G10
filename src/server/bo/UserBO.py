from os import urandom
from .BusinessObject import BusinessObject

class User(BusinessObject):

    def __init__(self):
        super().__init__()
        self._vorname = None
        self._nachname = None
        self._benutzername = None
        self._email = None
        self._google_user_id = None
        self._urlaubstage = None


    def get_vorname(self):
        return self._vorname

    def set_vorname(self, vorname):
        self._vorname = vorname

    def get_nachname(self):
        return self._nachname

    def set_nachname(self, nachname):
        self._nachname = nachname

    def get_benutzername(self):
        return self._benutzername

    def set_benutzername(self, benutzername):
        self._benutzername = benutzername

    def get_email(self):
        return self._email
    
    def set_email(self, email):
        self._email = email

    def get_google_user_id(self):
        return self._google_user_id

    def set_google_user_id(self, google_user_id):
        self._google_user_id = google_user_id

    def get_urlaubstage(self):
        return self._urlaubstage

    def set_urlaubstage(self, urlaubstage):
        self._urlaubstage = urlaubstage

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_vorname(), self.get_nachname(), self.get_benutzername(), self.get_email(), self.get_google_user_id(), self.get_urlaubstage())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Abweseneheit()."""
        obj = User()
        obj.set_vorname(dictionary["vorname"])
        obj.set_nachname(dictionary["nachname"])  
        obj.set_benutzername(dictionary["benutzername"])
        obj.set_email(dictionary["email"])
        obj.set_google_user_id(dictionary["google_user_id"])
        obj.set_urlaubstage(dictionary["urlaubstage"])

        return obj