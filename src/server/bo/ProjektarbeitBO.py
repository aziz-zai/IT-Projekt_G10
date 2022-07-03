from .ZeitintervallBO import Zeitintervall

"""
Klasse Projektarbeit mit einfachen Methoden zum Setzen der Klassenvariablen

"""


class Projektarbeit(Zeitintervall):
    def __init__(self):
        super().__init__()
        self._beschreibung = ""
        self._activity = None

    def get_beschreibung(self):
        """Auslesen der Projektarbeit-Beschreibung"""
        return self._beschreibung

    def set_beschreibung(self, beschreibung):
        """Setzen der Projektarbeit-Beschreibung"""
        self._beschreibung = beschreibung

    def get_activity(self):
        """Auslesen der Aktivitäten-ID"""
        return self._activity

    def set_activity(self, activity):
        """Setzen der Aktivitäten-ID"""
        self._activity = activity

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Projektarbeit()."""
        obj = Projektarbeit()
        obj.set_bezeichnung(dictionary["bezeichnung"])
        obj.set_start(dictionary["start"])
        obj.set_ende(dictionary["ende"])
        obj.set_beschreibung(dictionary["beschreibung"])
        obj.set_activity(dictionary["activity"])
        return obj
