from .ZeitintervallBO import Zeitintervall

"""
Klasse Abwesenheit

"""


class Abwesenheit(Zeitintervall):
    def __init__(self):
        super().__init__()
        self._abwesenheitsart = None
        self._bezeichnung = None

    def get_abwesenheitsart(self):
        """Auslesen der Abwesenheitsart"""
        return self._abwesenheitsart

    def set_abwesenheitsart(self, abwesenheitsart):
        """Setzen der Abwesenheitsart"""
        self._abwesenheitsart = abwesenheitsart

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung"""
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        """Setzen der Bezeichnung"""
        self._bezeichnung = bezeichnung

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Abwesenenheit: {}, {}, {}, {}, {}, {}".format(
            self.get_id(),
            self.get_timestamp(),
            self.get_abwesenheitsart(),
            self.get_start(),
            self.get_ende(),
            self.get_bezeichnung(),
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in eine Abweseneheit()."""
        obj = Abwesenheit()
        obj.set_abwesenheitsart(dictionary["abwesenheitsart"])
        obj.set_start(dictionary["start"])
        obj.set_ende(dictionary["ende"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj
