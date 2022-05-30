from .ZeitintervallBO import Zeitintervall


class Projektarbeit(Zeitintervall):
    def __init__(self):
        super().__init__()
        self._beschreibung = ""
        self._activity = None

    def get_beschreibung(self):
        return self._beschreibung

    def set_beschreibung(self, beschreibung):
        self._beschreibung = beschreibung

    def get_activity(self):
        return self._activity

    def set_activity(self, activity):
        self._activity = activity

    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Projektarbeit()."""
        obj = Projektarbeit()
        obj.set_bezeichnung(dictionary["bezeichnung"])
        obj.set_start(dictionary["start"])  
        obj.set_ende(dictionary["ende"])
        obj.set_beschreibung(dictionary["beschreibung"])
        obj.set_activity(dictionary["activity"])  
        return obj    
        
        
       