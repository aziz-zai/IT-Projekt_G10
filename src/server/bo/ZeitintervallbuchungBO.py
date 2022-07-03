from .BuchungBO import Buchung

"""
Klasse Zeitintervallbuchung

"""


class Zeitintervallbuchung(Buchung):
    def __init__(self):
        super().__init__()
        self._zeitintervall = None
        self._zeitdifferenz = ""
        self._bezeichnung = ""

    def get_zeitintervall(self):
        """Auslesen der Zeitintervall-ID"""
        return self._zeitintervall

    def set_zeitintervall(self, zeitintervall):
        """Setzen der Zeitintervall-ID"""
        self._zeitintervall = zeitintervall

    def get_zeitdifferenz(self):
        """Auslesen der Zeitdifferenz"""
        return self._zeitdifferenz

    def set_zeitdifferenz(self, zeitdifferenz):
        """Setzen der Zeitdifferenz"""
        self._zeitdifferenz = zeitdifferenz

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung"""
        return self._bezeichnung

    def set_bezeichnung(self, bezeichnung):
        """Setzen der Bezeichnung"""
        self._bezeichnung = bezeichnung

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Zeitintervallbuchung()."""
        obj = Zeitintervallbuchung()
        obj.set_zeitintervall(dictionary["zeitintervall"])
        obj.set_erstellt_von(dictionary["erstellt_von"])
        obj.set_erstellt_für(dictionary["erstellt_für"])
        obj.set_ist_buchung(dictionary["ist_buchung"])
        obj.set_bezeichnung(dictionary["bezeichnung"])
        return obj
