from .BuchungBO import Buchung

"""
Klasse Ereignisbuchung

"""

class Ereignisbuchung(Buchung):
    def __init__(self):
        super().__init__()
        self._ereignis = None
        
    def get_ereignis(self):
        """Auslesen der Ereignis-ID"""
        return self._ereignis 
    
    def set_ereignis(self, ereignis):
        """Setzen der Ereignis-ID"""
        self._ereignis = ereignis 

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Ereignisbuchung: {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_timestamp(), 
        self.get_erstellt_von(), self.get_erstellt_für(), self.get_ist_buchung(), self.get_ereignis(), self.get_bezeichnung())     
    
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Ereignisbuchung()."""
        obj = Ereignisbuchung()
        obj.set_erstellt_von(dictionary["erstellt_von"])
        obj.set_erstellt_für(dictionary["erstellt_für"])  
        obj.set_ist_buchung(dictionary["ist_buchung"])
        obj.set_ereignis(dictionary["ereignis"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj

        