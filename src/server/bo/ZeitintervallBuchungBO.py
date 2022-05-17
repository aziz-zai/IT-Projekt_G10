from server.bo.BuchungBO import Buchung

from datetime import datetime


class Zeitintervallbuchung(Buchung):
    
    def __init__(self, arbeitszeitkonto: int, timestamp: datetime = datetime.now(), id: int= 0, zeitdifferenz: str=""):
        
        self.zeitdifferenz = zeitdifferenz

        super().__init__(timestamp=timestamp,id=id, buchung=buchung, arbeitszeitkonto=arbeitszeitkonto)
