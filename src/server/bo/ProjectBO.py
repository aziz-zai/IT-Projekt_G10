from .BusinessObject import BusinessObject
from datetime import datetime

class Project(BusinessObject):
    def __init__(self, projektname: str, laufzeit: int, auftraggeber: str,
    availablehours: float, timestamp: datetime = datetime.now, id: int = 0):

        self.projektname = projektname
        self.laufzeit = laufzeit
        self.auftraggeber = auftraggeber
        self.availablehours = availablehours

        super().__init__(timestamp=timestamp, id=id)
    