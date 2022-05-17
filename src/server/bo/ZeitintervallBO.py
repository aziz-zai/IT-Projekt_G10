from .BusinessObject import BusinessObject
from datetime import datetime


class Zeitintervall(BusinessObject):
    def __init__(self, start: int, ende: int, timestamp: datetime = datetime.now(), id: int= 0):

        self.start = start
        self.ende = ende
        super().__init__(timestamp=timestamp,id=id)