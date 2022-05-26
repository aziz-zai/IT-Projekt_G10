from .BusinessObject import BusinessObject
from datetime import datetime


class Arbeitszeitkonto(BusinessObject):
    def __init__(self, urlaubskonto:float, user: int, arbeitsleistung: float, gleitzeit: float, timestamp: datetime = datetime.now(), id: int= 0):
    
        self.urlaubskonto = urlaubskonto 
        self.user = user
        self.arbeitsleistung = arbeitsleistung
        self.gleitzeit = gleitzeit
        
        super().__init__(timestamp=timestamp,id=id)