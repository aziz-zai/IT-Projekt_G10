from .EreignisBO import Ereignis
from datetime import datetime


class Gehen(Ereignis):
    def __init__(self, zeitpunkt:datetime, bezeichnung: str, timestamp: datetime = datetime.now(), id: int= 0):
        

        super().__init__(timestamp = timestamp, id = id, zeitpunkt = zeitpunkt, bezeichnung = bezeichnung)