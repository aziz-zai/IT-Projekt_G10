from .BusinessObject import BusinessObject
from datetime import datetime


class Abwesenheit(BusinessObject):
    def __init__(self, zeitintervallID : int, bemerkung: float, timestamp: datetime = datetime.now(), id: int= 0):

        self.zeitintervallID = zeitintervallID
        self.bemerkung = bemerkung

        super().__init__(timestamp=timestamp,id=id)
