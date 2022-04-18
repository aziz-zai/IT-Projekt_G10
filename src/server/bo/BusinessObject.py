from abc import ABC, abstractmethod
from datetime import datetime


class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes BusinessObject eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self, timestamp: datetime = datetime.now() ,id: int = 0):
        self.timestamp = timestamp
        self.id = id
