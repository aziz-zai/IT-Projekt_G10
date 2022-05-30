from .ZeitintervallBO import Zeitintervall

class Pause(Zeitintervall):
    def __init__(self):
        super().__init__()

    

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Pause()."""
        obj = Pause()
        obj.set_start(dictionary["start"])  
        obj.set_ende(dictionary["ende"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
      
        return obj
        