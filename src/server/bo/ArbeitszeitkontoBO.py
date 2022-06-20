from.BusinessObject import BusinessObject

class Arbeitszeitkonto(BusinessObject):
    def __init__(self):
        super().__init__()
        self._urlaubskonto = None 
        self._user = None
        self._arbeitsleistung = None
        self._gleitzeit = None

    def get_urlaubskonto(self):
        return self._urlaubskonto 

    def set_urlaubskonto(self, urlaubskonto):
        self._urlaubskonto = urlaubskonto
    
    def get_user(self):
        return self._user

    def set_user(self, user):
        self._user= user
    
    def get_arbeitsleistung(self):
        return self._arbeitsleistung

    def set_arbeitsleistung(self, arbeitsleistung):
        self._arbeitsleistung= arbeitsleistung
    
    def get_gleitzeit(self):
        return self._gleitzeit

    def set_gleitzeit(self, gleitzeit):
        self._gleitzeit= gleitzeit
    
    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Arbeitszeitkonto: {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_urlaubskonto(), self.get_user(), self.get_arbeitsleistung(), self.get_gleitzeit)
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Arbeitszeitkonto()."""
        obj = Arbeitszeitkonto()
        obj.set_urlaubskonto(dictionary["urlaubskonto"])
        obj.set_user(dictionary["user"])  
        obj.set_arbeitsleistung(dictionary["arbeitsleistung"])
        obj.set_gleitzeit(dictionary["gleitzeit"])
        return obj