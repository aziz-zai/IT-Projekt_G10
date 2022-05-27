from abc import ABC, abstractmethod
from datetime import datetime


class BusinessObject(ABC):
    def __init__(self):
        self._id = 0
        self._timestamp = datetime.now()

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self, id):
        """Setzen der ID."""
        self._id = id

    def get_timestamp(self):
        return self._timestamp

    def set_timestamp(self, timestamp):
        self._timestamp = timestamp

