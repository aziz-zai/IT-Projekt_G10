from .BusinessObject import BusinessObject
from datetime import datetime

class Project(BusinessObject):
    def __init__(self, projektname: str, laufzeit: int, auftraggeber: str,
    availablehours: float, user: int=0, timestamp: datetime = datetime.now, id: int = 0):

        self.projektname = projektname
        self.laufzeit = laufzeit
        self.auftraggeber = auftraggeber
        self.availablehours = availablehours
        self.user = user

        super().__init__(timestamp=timestamp, id=id)
    