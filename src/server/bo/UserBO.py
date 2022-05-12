from .BusinessObject import BusinessObject
from datetime import datetime
from server.bo.


class User(BusinessObject):
    def __init__(self, vorname: str, nachname: str, benutzername: str, email: str, google_user_id: str,
                arbeitszeitkonto: int, timestamp: datetime = datetime.now(), id: int= 0):

        self.vorname = vorname
        self.nachname = nachname
        self.benutzername = benutzername
        self.email = email
        self.google_user_id = google_user_id
        self.arbeitszeitkonto = arbeitszeitkonto
        super().__init__(timestamp=timestamp,id=id)
