from .BusinessObject import BusinessObject
from datetime import datetime


class Aktivitäten(BusinessObject):
    def __init__(self, bezeichnung: str, dauer: float, capacity: float, project: int,
                timestamp: datetime = datetime.now(), id: int= 0):
        self.bezeichnung = bezeichnung 
        self.dauer = dauer
        self.capacity = capacity
        self.project=project

        super().__init__(timestamp=timestamp,id=id)