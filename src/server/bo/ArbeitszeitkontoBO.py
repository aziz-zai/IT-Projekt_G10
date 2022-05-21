from .BusinessObject import BusinessObject
from datetime import datetime


class Arbeitszeitkonto(BusinessObject):
    def __init__(self, urlaubstage:float, user: int, timestamp: datetime = datetime.now(), id: int= 0):
    
        self.urlaubstage = urlaubstage
        self.user = user
        
        super().__init__(timestamp=timestamp,id=id)