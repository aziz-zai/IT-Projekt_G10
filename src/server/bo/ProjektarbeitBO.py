from .ZeitintervallBO import Zeitintervall
from datetime import datetime


class Projektarbeit(Zeitintervall):
    def __init__(self, bezeichnung: str, beschreibung: str, activity: int, start: int, 
    ende: int=0, timestamp: datetime = datetime.now(), id: int= 0):

        self.beschreibung = beschreibung
        self.activity = activity
        super().__init__(timestamp=timestamp,id=id,start=start,ende=ende, bezeichnung=bezeichnung)