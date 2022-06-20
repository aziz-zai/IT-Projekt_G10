from .BusinessObject import BusinessObject


class Ereignis(BusinessObject):
    def __init__(self):
        super().__init__()
        self._zeitpunkt = None
        self._bezeichnung = None
        
    def get_zeitpunkt (self):
        return self._zeitpunkt 
    
    def set_zeitpunkt(self, zeitpunkt ):
        self._zeitpunkt  = zeitpunkt 
    
    def get_bezeichnung(self):
        return self._bezeichnung
    
    def set_bezeichnung(self, bezeichnung ):
        self._bezeichnung  = bezeichnung        

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Ereignis: {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_zeitpunkt(), self.get_bezeichnung())
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Ereignis()."""
        obj = Ereignis()
        obj.set_zeitpunkt(dictionary["zeitpunkt"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj

