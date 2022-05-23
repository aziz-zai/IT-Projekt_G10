from xmlrpc.client import boolean
from .BuchungBO import Buchung
from datetime import datetime


class Ereignisbuchung(Buchung):
    def __init__(self, erstellt_von: int, erstellt_für: int, ist_buchung: bool, ereignis: int, id: int = 0, timestamp: datetime = datetime.now(), ):
        
        self.ereignis = ereignis

        super().__init__(erstellt_von=erstellt_von, erstellt_für=erstellt_für, ist_buchung=ist_buchung, timestamp = timestamp, id = id)
        