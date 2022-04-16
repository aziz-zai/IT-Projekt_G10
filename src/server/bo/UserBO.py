from .BusinessObject import BusinessObject
from datetime import datetime


class User(BusinessObject):
    def __init__(self, vorname: str, nachname: str,
                timestamp_: datetime = datetime.now(), id_: int= 0):
        self.vorname = vorname
        self.nachname = nachname

        super().__init__(timestamp_=timestamp_,id_=id_)
