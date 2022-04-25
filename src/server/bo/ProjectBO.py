from .BusinessObject import BusinessObject
from datetime import datetime

class Project(BusinessObject):
    def __init__(self, projektname: str, laufzeit: int, auftraggeber: str, projektleiter: bool,
    availablehours: float, user: int, timestamp: datetime = datetime.now, id: int = 0):

        self.projektname = projektname
        self.laufzeit = laufzeit
        self.auftraggeber = auftraggeber
        self.projektleiter = projektleiter
        self.availablehours = availablehours
        self.user = user

        super().__init__(timestamp=timestamp, id=id)
    