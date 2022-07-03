from .BusinessObject import BusinessObject

"""
Klasse Zeitintervall

"""


class Zeitintervall(BusinessObject):
    def __init__(self):
        super().__init__()
        self._start = None
        self._ende = None
        self._bezeichnung = ""

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung"""
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        """Setzen der Bezeichnung"""
        self._bezeichnung = bezeichnung

    def get_start(self):
        """Auslesen des Startes"""
        return self._start

    def set_start(self, start):
        """Setzen des Startes"""
        self._start = start

    def get_ende(self):
        """Auslesen des Endes"""
        return self._ende

    def set_ende(self, ende):
        """Setzen des Endes"""
        self._ende = ende

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Zeitintervall: {}, {}, {}, {}, {}".format(
            self.get_id(),
            self.get_timestamp(),
            self.get_bezeichnung(),
            self.get_start(),
            self.get_ende(),
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Zeitintervall()."""
        obj = Zeitintervall()
        obj.set_bezeichnung(dictionary["bezeichnung"])
        obj.set_start(dictionary["start"])
        obj.set_ende(dictionary["ende"])

        return obj
