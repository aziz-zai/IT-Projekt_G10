from .BuchungBO import Buchung


class Zeitintervallbuchung(Buchung):
    def __init__(self):
        super().__init__()
        self._zeitintervall = None
        self._zeitdifferenz = None

    def get_zeitintervall(self):
        return self._zeitintervall

    def set_zeitintervall(self, zeitintervall):
        self._zeitintervall = zeitintervall
        
    def get_zeitdifferenz(self):
        return self._zeitintervall

    def set_zeitdifferenz(self, zeitdifferenz):
        self._zeitdifferenz = zeitdifferenz


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Zeitintervallbuchung()."""
        obj = Zeitintervallbuchung()
        obj.set_zeitintervall(dictionary["zeitintervall"])
        obj.set_zeitdifferenz(dictionary["zeitdifferenz"])  
        obj.set_erstellt_von(dictionary["erstellt_von"])
        obj.set_erstellt_für(dictionary["erstellt_für"])  
        obj.set_ist_buchung(dictionary["ist_buchung"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj

      
        
      