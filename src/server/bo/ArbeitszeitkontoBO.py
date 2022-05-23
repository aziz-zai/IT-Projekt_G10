from .BusinessObject import BusinessObject
from datetime import datetime


class Arbeitszeitkonto(BusinessObject):
    def __init__(self, urlaubskonto:float, user: int, arbeitsleistung: float, überstunden: float, timestamp: datetime = datetime.now(), id: int= 0):
    
        self.urlaubskonto = urlaubskonto 
        self.user = user
        self.arbeitsleistung = arbeitsleistung
        self.überstunden = überstunden
        
        super().__init__(timestamp=timestamp,id=id)