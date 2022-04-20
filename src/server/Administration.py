from .bo.UserBO import User

from .db.UserMapper import UserMapper
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
        aktivitäten = Aktivitäten
        aktivitäten.timestamp = datetime.now()
        aktivitäten.bezeichnung = bezeichnung
        aktivitäten.dauer = dauer
        aktivitäten.kapazität = kapazität

        with AktivitätenMapper() as mapper:
            return mapper.insert(aktivitäten)