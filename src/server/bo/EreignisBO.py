from .BusinessObject import BusinessObject
from datetime import datetime


class Ereignis(BusinessObject):
    def __init__(self, timestamp: datetime = datetime.now(), id: int = 0, zeitpunkt: datetime = datetime):

        self.zeitpunkt = zeitpunkt
        super().__init__(timestamp = timestamp, id = id)
