from .BuchungBO import Buchung
from datetime import datetime


class Ereignisbuchung(Buchung):
    def __init__(self, ereignis:int, arbeitszeitkonto: int=0,timestamp: datetime = datetime.now(), id: int = 0):
        self.ereignis = ereignis
        super().__init__(arbeitszeitkonto = arbeitszeitkonto, timestamp = timestamp, id = id)
        