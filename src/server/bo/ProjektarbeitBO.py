from .ZeitintervallBO import Zeitintervall
from datetime import datetime


class Projektarbeit(Zeitintervall):
    def __init__(self, bezeichnung: str, zeitintervall_id: str, activity_id: str, start: int, ende: int, zeitdifferenz: float, timestamp: datetime = datetime.now(), id: int= 0):

        self.bezeichnung = bezeichnung
        self.zeitintervall_id = zeitintervall_id
        self.activity_id = activity_id
        super().__init__(timestamp=timestamp,id=id,start=start,ende=ende,zeitdifferenz=zeitdifferenz)