from .BuchungBO import Buchung
from datetime import datetime


class Zeitintervallbuchung(Buchung):
    def __init__(self,
                arbeitszeitkonto: int,
                zeitintervall: int,
                zeitdifferenz:str="",
                timestamp: datetime = datetime.now(),
                id: int= 0):
                
        self.zeidifferenz = zeitdifferenz
        self.zeitintervall = zeitintervall
        
        super().__init__(timestamp=timestamp,id=id, arbeitszeitkonto=arbeitszeitkonto)

