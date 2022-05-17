from .BusinessObject import BusinessObject
from datetime import datetime


class Zeitintervallbuchung(Buchung):
    def __init__(self, buchung: int, arbeitszeitkonto: int, timestamp: datetime = datetime.now(), id: int= 0):
        
        super().__init__(timestamp=timestamp,id=id, buchung=buchung, arbeitszeitkonto=arbeitszeitkonto)

