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

    def get_timestamp(self):
        """Auslesen des Zeitstempels"""
        return self.timestamp

    def set_timestamp(self, timestamp):
        self.timestamp = timestamp

    def get_id_(self):
        """Auslesen der ID"""
        return self.id_

    def set_id(self, id_):
        self.id_ =  id_
    