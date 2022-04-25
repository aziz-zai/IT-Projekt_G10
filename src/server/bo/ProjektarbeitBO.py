from .BusinessObject import BusinessObject
from datetime import datetime


class Projektarbeit(BusinessObject):
    def __init__(self, bezeichnung: str, timestamp: datetime = datetime.now(), id: int= 0):

        self.bezeichnung = bezeichnung
        super().__init__(timestamp=timestamp,id=id)