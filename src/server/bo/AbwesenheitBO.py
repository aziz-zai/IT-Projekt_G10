from datetime import datetime
from .ZeitintervallBO import Zeitintervall


class Abwesenheit(Zeitintervall):
    def __init__(self, start: int, ende: int, abwesenheitsart: int, timestamp: datetime = datetime.now(), id: int= 0):

        self.abwesenheitsart = abwesenheitsart

        super().__init__(timestamp=timestamp,id=id,start=start,ende=ende)
