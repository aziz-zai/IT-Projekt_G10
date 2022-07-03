from abc import ABC, abstractmethod
from datetime import datetime

"""
Gemeinsame Basisklasse aller relevanten Klassen in diesem Projekt.
Jedes BusinessObject besitzt eine festgelegte ID und einen Timestamp.

"""


class BusinessObject(ABC):
    def __init__(self):
        self._id = 0
        self._timestamp = datetime.now()

    def get_id(self):
        """Auslesen der ID"""
        return self._id

    def set_id(self, id):
        """Setzen der ID"""
        self._id = id

    def get_timestamp(self):
        """Auslesen des Zeitstempels der letzten Änderung"""
        return self._timestamp

    def set_timestamp(self, timestamp):
        """Setzen des Zeitstempels der letzten Änderung"""
        self._timestamp = timestamp
