from .ZeitintervallBO import Zeitintervall
from datetime import datetime


class Projektarbeit(Zeitintervall):
    def __init__(self, bezeichnung: str, activity: int, start: int, 
    ende: int, zeitdifferenz: float, timestamp: datetime = datetime.now(), id: int= 0):

        self.bezeichnung = bezeichnung
        self.activity = activity
        super().__init__(timestamp=timestamp,id=id,start=start,ende=ende,zeitdifferenz=zeitdifferenz)