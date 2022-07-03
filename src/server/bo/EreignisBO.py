from .BusinessObject import BusinessObject

"""
Klasse Ereignis mit einfachen Methoden zum setzen der Klassenvariablen
"""


class Ereignis(BusinessObject):
    def __init__(self):
        super().__init__()
        self._zeitpunkt = None
        self._bezeichnung = None

    def get_zeitpunkt(self):
        """Auslesen des Ereignis-Zeitpunktes"""
        return self._zeitpunkt

    def set_zeitpunkt(self, zeitpunkt):
        """Setzen des Ereignis-Zeitpunktes"""
        self._zeitpunkt = zeitpunkt

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung des Ereignisses"""
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        """Setzen der Bezeichnung des Ereignisses"""
        self._bezeichnung = bezeichnung

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Ereignis: {}, {}, {}, {}".format(
            self.get_id(),
            self.get_timestamp(),
            self.get_zeitpunkt(),
            self.get_bezeichnung(),
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Ereignis()."""
        obj = Ereignis()
        obj.set_zeitpunkt(dictionary["zeitpunkt"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj
