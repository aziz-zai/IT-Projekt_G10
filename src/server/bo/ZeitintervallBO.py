from .BusinessObject import BusinessObject

class Zeitintervall(BusinessObject):
    def __init__(self):
        super().__init__()
        self._start = None
        self._ende = None
    
    def get_bezeichnung(self):
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        self._bezeichnung = bezeichnung

    def get_start(self):
        return self._start

    def set_start(self, start):
        self._start = start
    
    def get_ende(self):
        return self._ende

    def set_ende(self, ende):
        self._ende = ende
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Zeitintervall: {}, {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), self.get_bezeichnung(), self.get_start(), self.get_ende())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Abweseneheit()."""
        obj = Zeitintervall()
        obj.set_id(dictionary["id"])
        obj.set_timestamp(dictionary["timestamp"])
        obj.set_bezeichnung(dictionary)["bezeichnung"]
        obj.set_start(dictionary["start"])  
        obj.set_ende(dictionary["ende"])
        return obj    

    