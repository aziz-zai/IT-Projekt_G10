from .BuchungBO import Buchung
from datetime import datetime


class Zeitintervallbuchung(Buchung):
    def __init__(self,zeitintervall: int, erstellt_von: int, erstellt_für: int, ist_buchung: bool, zeitdifferenz:str="", timestamp: datetime = datetime.now(), id: int= 0):
        self.zeitintervall = zeitintervall
        self.zeidifferenz = zeitdifferenz
        self.erstellt_von = erstellt_von
        self.erstellt_für = erstellt_für
        self.ist_buchung = ist_buchung
        
        super().__init__(timestamp=timestamp,id=id)

