from .BusinessObject import BusinessObject
from datetime import datetime

class Project(BusinessObject):
    def __init__(self, projektname: str, laufzeit: int, auftraggeber: str, 
    timestamp: datetime = datetime.now, id: int = 0):

        self.projektname = projektname
        self.laufzeit = laufzeit
        self.auftraggeber = auftraggeber
        
        super().__init__(timestamp=timestamp, id=id)
    