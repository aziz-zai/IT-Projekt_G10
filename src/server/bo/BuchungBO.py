from abc import ABC, abstractmethod
from datetime import datetime
from server.bo.BusinessObject import BusinessObject

"""
Klasse Buchung mit einfachen Methoden zum setzen der Klassenvariablen

"""


class Buchung(BusinessObject):
    """Gemeinsame Basisklasse für Zeitintervallbuchung und Ereignisbuchung."""

    def __init__(self):
        super().__init__()
        self._erstellt_von = None
        self._erstellt_für = None
        self._ist_buchung = None
        self._bezeichnung = ""

    def get_erstellt_von(self):
        """Auslesen des Erstellers"""
        return self._erstellt_von

    def set_erstellt_von(self, erstellt_von):
        """Setzen des Erstellers"""
        self._erstellt_von = erstellt_von

    def get_erstellt_für(self):
        """Auslesen des Empfängers"""
        return self._erstellt_für

    def set_erstellt_für(self, erstellt_für):
        """Setzen des Empfängers"""
        self._erstellt_für = erstellt_für

    def get_ist_buchung(self):
        """Auslesen der IST-Buchung"""
        return self._ist_buchung

    def set_ist_buchung(self, ist_buchung):
        """Setzen der IST-Buchung"""
        self._ist_buchung = ist_buchung

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung"""
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        """Setzen der Bezeichnung"""
        self._bezeichnung = bezeichnung

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Buchung: {}, {}, {}, {}, {}".format(
            self.get_id(),
            self.get_timestamp(),
            self.get_erstellt_von(),
            self.get_erstellt_für(),
            self.get_ist_buchung(),
            self.get_bezeichnung(),
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Buchung()."""
        obj = Buchung()
        obj.set_erstellt_von(dictionary["erstellt_von"])
        obj.set_erstellt_für(dictionary["erstellt_für"])
        obj.set_ist_buchung(dictionary["ist_buchung"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj
