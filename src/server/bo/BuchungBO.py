from abc import ABC, abstractmethod
from datetime import datetime

from server.bo.BusinessObject import BusinessObject


class Buchung(BusinessObject):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes Buchung eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self, timestamp: datetime = datetime.now(), id:int =0, arbeitszeitkonto:int =0):
        self.arbeitszeitkonto = arbeitszeitkonto
        super().__init__(timestamp = timestamp, id = id)
        