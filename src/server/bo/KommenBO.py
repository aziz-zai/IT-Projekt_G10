from .EreignisBO import Ereignis
from datetime import datetime


class Kommen(Ereignis):

    def __init__(self):
        super().__init__()

    

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in Kommen()."""
        obj = Kommen()
        obj.set_zeitpunkt(dictionary["zeitpunkt"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        
        return obj

        