from .BuchungBO import Buchung
from datetime import datetime


class Ereignisbuchung(Buchung):
    def __init__(self, buchung: int, timestamp: datetime = datetime.now(), id: int = 0):
        self.buchung = buchung
    
        super().__init__(arbeitszeitkonto = arbeitszeitkonto, timestamp = timestamp, id = id)
        