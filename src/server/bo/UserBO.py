from .BusinessObject import BusinessObject
from datetime import datetime



class User(BusinessObject):
    def __init__(self, vorname: str, nachname: str, benutzername: str, email: str, google_user_id: str,
            urlaubstage:int=20, timestamp: datetime = datetime.now(), id: int= 0):

        self.vorname = vorname
        self.nachname = nachname
        self.benutzername = benutzername
        self.email = email
        self.google_user_id = google_user_id
        self.urlaubstage = urlaubstage
        super().__init__(timestamp=timestamp,id=id)
