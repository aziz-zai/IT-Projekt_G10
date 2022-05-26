from .BusinessObject import BusinessObject
from datetime import datetime


class Ereignis(BusinessObject):
    def __init__(self, zeitpunkt: datetime, bezeichnung: str, timestamp: datetime = datetime.now(), id: int = 0):

        self.zeitpunkt = zeitpunkt
        self.bezeichnung = bezeichnung
        super().__init__(timestamp = timestamp, id = id)
