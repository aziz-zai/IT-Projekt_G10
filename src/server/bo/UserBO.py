from .BusinessObject import BusinessObject
from datetime import datetime


class User(BusinessObject):
    def __init__(self, vorname: str, nachname: str,
                timestamp: datetime = datetime.now(), id: int= 0):
        self.vorname = vorname
        self.nachname = nachname

        super().__init__(timestamp=timestamp,id=id)
