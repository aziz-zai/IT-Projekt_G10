from .BusinessObject import BusinessObject
from datetime import datetime


class User(BusinessObject):
    def __init__(self, vorname: str, nachname: str, user_name: str, email: str, google_user_id: str,
                timestamp_: datetime = datetime.now(), id_: int= 0):
        self.vorname = vorname
        self.nachname = nachname
        self.user_name = user_name
        self.email = email
        self.google_user_id = google_user_id

        super().__init__(timestamp_=timestamp_,id_=id_)
