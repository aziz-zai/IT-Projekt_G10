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

    def set_bezeichnung(self, bezeichnung):
        """Setzen der Bezeichnung der Aktivität."""
        self._bezeichnung = bezeichnung

    def get_dauer(self):
        """Auslesen der Dauer der Aktivität."""
        return self.dauer

    def set_dauer(self, dauer):
        """Setzen der Dauer der Aktivität."""
        self._dauer = dauer 

    def get_kapazität(self):
        """Auslesen der Kapazität der Aktivität."""
        return self.kapazität

    def set_kapazität(self, kapazität):
        """Setzen der Kapazität der Aktivität."""
        self._kapazität = kapazität


    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Customer()."""
        obj = Aktivitäten()
        obj.set_bezeichnung(dictionary["bezeichnung"])  # eigentlich Teil von BusinessObject !
        obj.set_dauer(dictionary["dauer"])
        obj.set_kapazität(dictionary["kapazität"])
        return obj