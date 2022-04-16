from abc import ABC, abstractmethod
from datetime import datetime


class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes BusinessObject eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self, timestamp_: datetime = datetime.now() ,id_: int = 0):
        self.timestamp = timestamp_
        self.id_ = id_
