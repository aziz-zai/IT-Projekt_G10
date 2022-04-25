from .BusinessObject import BusinessObject
from datetime import datetime


# Sobald Zeitintervall verfügbar, Superklasse umändern auf Zeitintervall!

class Projektarbeit(BusinessObject):
    def __init__(self, bezeichnung: str, zeitintervall_id: str, activity_id: str, timestamp: datetime = datetime.now(), id: int= 0):

        self.bezeichnung = bezeichnung
        self.zeitintervall_id = zeitintervall_id
        self.activity_id = activity_id
        super().__init__(timestamp=timestamp,id=id)