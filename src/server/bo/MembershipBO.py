from .BusinessObject import BusinessObject

"""
Klasse Membership

"""

class Membership(BusinessObject):
    def __init__(self):
        super().__init__()
        self._user = None
        self._project = None
        self._projektleiter = None

    def get_user(self):
        """Auslesen der User-ID"""
        return self._user

    def set_user(self, user):
        """Setzen der User-ID"""
        self._user = user

    def get_project(self):
        """Auslesen der Projekt-ID"""
        return self._project

    def set_project(self, project):
        """Setzen der Projekt-ID"""
        self._project = project

    def get_projektleiter(self):
        """Auslesen des Projektleiters"""
        return self._projektleiter

    def set_projektleiter(self, projektleiter):
        """Setzen des Projektleiters"""
        self._projektleiter = projektleiter


    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Membership: {}, {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_user(), self.get_project(), self.get_projektleiter())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Membership()."""
        obj = Membership()
        obj.set_user(dictionary["user"])
        obj.set_project(dictionary["project"])  
        obj.set_projektleiter(dictionary["projektleiter"])
        return obj