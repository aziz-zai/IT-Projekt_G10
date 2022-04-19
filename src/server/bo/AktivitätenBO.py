from .BusinessObject import BusinessObject
from datetime import datetime


class Aktivitäten(BusinessObject):
    def __init__(self, bezeichnung: str, dauer: float, kapazität: float,
                timestamp_: datetime = datetime.now(), id_: int= 0):
        self.bezeichnung = bezeichnung 
        self.dauer = dauer
        self.kapazität = kapazität

    def get_bezeichnung(self):
        """Auslesen der Bezeichnung der Aktivität."""
        return self._bezeichnung

    def set_bezeichnung(self, value):
        """Setzen der Bezeichnung der Aktivität."""
        self._bezeichnung = value

    def get_dauer(self):
        """Auslesen der Dauer der Aktivität."""
        return self.dauer

    def set_dauer(self, value):
        """Setzen der Dauer der Aktivität."""
        self._dauer = value 

    def get_kapazität(self):
        """Auslesen der Kapazität der Aktivität."""
        return self.kapazität

    def set_kapazität(self, value):
        """Setzen der Kapazität der Aktivität."""
        self._kapazität = value


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = Aktivität()
        obj.set_bezeichnung(dictionary["bezeichnung"])  # eigentlich Teil von BusinessObject !
        obj.set_dauer(dictionary["dauer"])
        obj.set_kapazität(dictionary["kapazität"])
        return obj