from .ZeitintervallBO import Zeitintervall


class Abwesenheit(Zeitintervall):
    def __init__(self):
        super().__init__()
        self._abwesenheitsart = None
        self._bezeichnung = None

    def get_abwesenheitsart(self):
        return self._abwesenheitsart
    
    def set_abwesenheitsart(self, abwesenheitsart):
        self._abwesenheitsart = abwesenheitsart

    def get_bezeichnung(self):
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        self._bezeichnung = bezeichnung

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Abwesenenheit: {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_abwesenheitsart(), self.get_start(), self.get_ende(), self.get_bezeichnung())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Abweseneheit()."""
        obj = Abwesenheit()
        obj.set_abwesenheitsart(dictionary["abwesenheitsart"])
        obj.set_start(dictionary["start"])  
        obj.set_ende(dictionary["ende"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj