from .EreignisBO import Ereignis

"""
Subklasse Gehen von Ereignis

"""


class Gehen(Ereignis):
    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Gehen()."""
        obj = Gehen()
        obj.set_zeitpunkt(dictionary["zeitpunkt"])
        obj.set_bezeichnung(dictionary["bezeichnung"])

        return obj
