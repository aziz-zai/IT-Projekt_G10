from .BusinessObject import BusinessObject
from datetime import datetime


class Abwesenheit(BusinessObject):
    def __init__(self, abwesenheitsart: str, zeitintervallID : int, bemerkung: float, timestamp: datetime = datetime.now(), id: int= 0):

        self.zeitintervallID = zeitintervallID
        self.bemerkung = bemerkung
        self.abwesenheitsart= abwesenheitsart

        super().__init__(timestamp=timestamp,id=id)
