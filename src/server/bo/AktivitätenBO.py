from .BusinessObject import BusinessObject
from datetime import datetime


class Aktivitäten(BusinessObject):
         
    def __init__(self):
        super().__init__()
        self._bezeichnung = None
        self._dauer = None
        self._capacity = None
        self._project = None

    def get_bezeichnung(self):
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        self._bezeichnung = bezeichnung

    def get_dauer(self):
        return self._dauer

    def set_dauer(self, dauer):
        self._dauer = dauer

    def get_capacity(self):
        return self._capacity

    def set_capacity(self, capacity):
        self._capacity = capacity

    def get_project(self):
        return self._project

    def set_project(self, project):
        self._project = project

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Aktivität: {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_bezeichnung(), self.get_dauer(), self.get_capacity(), self.get_project())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Aktivitäten()."""
        obj = Aktivitäten()
        obj.set_bezeichnung(dictionary["bezeichnung"])
        obj.set_capacity(dictionary["capacity"])  
        obj.set_dauer(dictionary["dauer"])
        obj.set_project(dictionary["project"])
        return obj