from .ZeitintervallBO import Zeitintervall
from datetime import datetime


class Pause(Zeitintervall):
    def __init__(self, start: int, ende: int=0, timestamp: datetime = datetime.now(), id: int= 0):

        super().__init__(timestamp=timestamp,id=id,start=start,ende=ende)