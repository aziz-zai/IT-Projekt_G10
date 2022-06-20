from .BusinessObject import BusinessObject

class Project(BusinessObject):
    def __init__(self):
        super().__init__()

        self._projektname = ""
        self._laufzeit = None
        self._auftraggeber = ""
        self._availablehours = None
    
    def set_projektname(self, projektname):
        self._projektname = projektname
    
    def get_projektname(self):
        return self._projektname
    
    def set_laufzeit(self, laufzeit):
        self._laufzeit = laufzeit
    
    def get_laufzeit(self):
        return self._laufzeit
    
    def set_auftraggeber(self, auftraggeber):
        self._auftraggeber = auftraggeber
    
    def get_auftraggeber(self):
        return self._auftraggeber

    def set_availablehours(self, availablehours):
        self._availablehours = availablehours
    
    def get_availablehours(self):
        return self._availablehours


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Project()."""
        obj = Project()
        obj.set_projektname(dictionary["projektname"])  
        obj.set_laufzeit(dictionary["laufzeit"])
        obj.set_auftraggeber(dictionary["auftraggeber"])
        obj.set_availablehours(dictionary["availablehours"])
        return obj
    
    