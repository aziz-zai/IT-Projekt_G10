from .BuchungBO import Buchung
from datetime import datetime


class Zeitintervallbuchung(Buchung):
    def __init__(self, erstellt_von: int, erstellt_für: int, ist_buchung: bool, zeitintervall: int, zeitdifferenz:str="", timestamp: datetime = datetime.now(), id: int= 0):
        self.erstellt_von = erstellt_von
        self.erstellt_für = erstellt_für
        self.ist_buchung = ist_buchung
        self.zeitintervall = zeitintervall
        self.zeitdifferenz = zeitdifferenz
        
        super().__init__(erstellt_von = erstellt_von, erstellt_für = erstellt_für, ist_buchung = ist_buchung, timestamp=timestamp,id=id)

