from abc import ABC, abstractmethod
from datetime import datetime

from server.bo.BusinessObject import BusinessObject


class Buchung(BusinessObject):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes Buchung eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self, erstellt_von: int, erstellt_für: int, ist_buchung: bool, timestamp: datetime = datetime.now(), id:int =0):
        self.erstellt_von = erstellt_von
        self.erstellt_für = erstellt_für
        self.ist_buchung = ist_buchung
       
        super().__init__(timestamp = timestamp, id = id)
        