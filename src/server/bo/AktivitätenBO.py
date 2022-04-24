from .BusinessObject import BusinessObject
from datetime import datetime


class Aktivitäten(BusinessObject):
    def __init__(self, bezeichnung: str, dauer: float, capacity: float,
                timestamp_: datetime = datetime.now(), id_: int= 0):
        self.bezeichnung = bezeichnung 
        self.dauer = dauer
        self.capacity = capacity

        super().__init__(timestamp_=timestamp_,id_=id_)