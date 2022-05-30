from abc import ABC, abstractmethod
from datetime import datetime

from server.bo.BusinessObject import BusinessObject


class Buchung(BusinessObject):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes Buchung eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self):
        super().__init__()
        self._erstellt_von = None
        self._erstellt_für = None
        self._ist_buchung = None
        self._bezeichnung = ""
    
    def get_erstellt_von(self):
        return self._erstellt_von
    
    def set_erstellt_von(self, erstellt_von):
        self._erstellt_von = erstellt_von

    def get_erstellt_für(self):
        return self._erstellt_für
    
    def set_erstellt_für(self, erstellt_für):
        self._erstellt_für = erstellt_für
    
    def get_ist_buchung(self):
        return self._ist_buchung

    def set_ist_buchung(self, ist_buchung):
        self._ist_buchung = ist_buchung
    
    def get_bezeichnung(self):
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        self._bezeichnung = bezeichnung

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Buchung: {}, {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_erstellt_von(), self.get_erstellt_für(), self.get_ist_buchung(), self.get_bezeichnung())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Buchung()."""
        obj = Buchung()
        obj.set_erstellt_von(dictionary["erstellt_von"])
        obj.set_erstellt_für(dictionary["erstellt_für"])  
        obj.set_ist_buchung(dictionary["ist_buchung"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj

    

    
    


       
        
        