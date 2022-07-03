from .BusinessObject import BusinessObject

"""
Klasse Projekt

"""


class Project(BusinessObject):
    def __init__(self):
        super().__init__()

        self._projektname = ""
        self._laufzeit = None
        self._auftraggeber = ""
        self._availablehours = None

    def set_projektname(self, projektname):
        """Setzen des Projektnamen"""
        self._projektname = projektname

    def get_projektname(self):
        """Auslesen des Projektnamen"""
        return self._projektname

    def set_laufzeit(self, laufzeit):
        """Setzen der Projektlaufzeit"""
        self._laufzeit = laufzeit

    def get_laufzeit(self):
        """Auslesen der Projektlaufzeit"""
        return self._laufzeit

    def set_auftraggeber(self, auftraggeber):
        """Setzen des Auftraggebers"""
        self._auftraggeber = auftraggeber

    def get_auftraggeber(self):
        """Auslesen des Auftraggebers"""
        return self._auftraggeber

    def set_availablehours(self, availablehours):
        """Setzen der verfügbaren Stunden"""
        self._availablehours = availablehours

    def get_availablehours(self):
        """Auslesen der verfügbaren Stunden"""
        return self._availablehours

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Project()."""
        obj = Project()
        obj.set_projektname(dictionary["projektname"])
        obj.set_laufzeit(dictionary["laufzeit"])
        obj.set_auftraggeber(dictionary["auftraggeber"])
        obj.set_availablehours(dictionary["availablehours"])
        return obj
