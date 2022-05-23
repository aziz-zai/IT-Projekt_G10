from .EreignisBO import Ereignis
from datetime import datetime


class Kommen(Ereignis):

    def __init__(self, zeitpunkt:datetime, bezeichnung: str, timestamp: datetime = datetime.now(), id: int= 0):
        self.bezeichnung = bezeichnung

        super().__init__(timestamp = timestamp, id = id, zeitpunkt = zeitpunkt)