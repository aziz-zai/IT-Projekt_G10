from .BusinessObject import BusinessObject
from datetime import datetime


class Kommen(BusinessObject):

    def __init__(self, timestamp_: datetime = datetime.now()):
        self.timestamp = timestamp_

    def get_timestamp(self):
        """Auslesen des Zeitstempels von Gehen."""
        return self._timestamp

    def set_timestamp(self, timestamp):
        self._timestamp = timestamp


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = Kommen()
        obj.set_timestamp(dictionary["timestamp"])
        return obj