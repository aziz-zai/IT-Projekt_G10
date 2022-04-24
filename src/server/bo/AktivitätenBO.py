from .BusinessObject import BusinessObject
from datetime import datetime


class Aktivitäten(BusinessObject):
    def __init__(self, bezeichnung: str, dauer: float, capacity: float,
                timestamp: datetime = datetime.now(), id: int= 0):
        self.bezeichnung = bezeichnung 
        self.dauer = dauer
        self.capacity = capacity

        super().__init__(timestamp=timestamp,id=id)