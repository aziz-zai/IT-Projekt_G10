from .bo.UserBO import User

from .db.AktivitätenMapper import AktivitätenMapper
from datetime import datetime


class Administration(object):

    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    """
    def __init__(self):
        pass

    """
    User-spezifische Methoden
    """
    def create_aktivitäten(self, bezeichnung, dauer, kapazität):
        """Einen Benutzer anlegen"""
        aktivitäten = aktivitäten
        aktivitäten.timestamp = datetime.now()
        aktivitäten.bezeichnung = bezeichnung
        aktivitäten.dauer = dauer
        aktivitäten.kapazität = kapazität

        with AktivitätenMapper() as mapper:
            return mapper.insert(aktivitäten)


    def get_all_aktivitäten(self):
        """Alle Aktivitäten auslesen"""
        with AktivitätenMapper() as mapper:
            return mapper.find_all()

    def get_aktivitäten_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with AktivitätenMapper() as mapper:
            return mapper.find_by_key(id)

    def get_aktivitäten_by_bezeichnung(self, bezeichnung):
        with AktivitätenMapper() as mapper:
            return mapper.find_by_bezeichnung(bezeichnung)

    def get_aktivitäten_by_dauer(self, dauer):
        with AktivitätenMapper() as mapper:
            return mapper.find_by_dauer(dauer)

    def update_aktivitäten(self, aktivitäten):
        with AktivitätenMapper() as mapper:
            return mapper.update(aktivitäten)

    def delete_aktivitäten(self, aktivitäten):
        with AktivitätenMapper() as mapper:
            return mapper.delete(aktivitäten)
