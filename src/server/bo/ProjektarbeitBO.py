from .ZeitintervallBO import Zeitintervall
from datetime import datetime


class Projektarbeit(Zeitintervall):
    def __init__(self, bezeichnung: str, activity: int, start: int, 
    ende: int, timestamp: datetime = datetime.now(), id: int= 0, zeitdifferenz: str=""):

        self.bezeichnung = bezeichnung
        self.activity = activity
        super().__init__(timestamp=timestamp,id=id,start=start,ende=ende,zeitdifferenz=zeitdifferenz)