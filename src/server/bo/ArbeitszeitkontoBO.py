from .BusinessObject import BusinessObject
from datetime import datetime


class Arbeitszeitkonto(BusinessObject):
    def __init__(self, urlaubstage:float, timestamp: datetime = datetime.now(), id: int= 0):

        self.urlaubstage = urlaubstage
        
        super().__init__(timestamp=timestamp,id=id)