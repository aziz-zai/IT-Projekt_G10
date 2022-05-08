from .bo.UserBO import User

from .db.AktivitätenMapper import AktivitätenMapper
from datetime import datetime
from server.bo.AktivitätenBO import Aktivitäten
from .db.UserMapper import UserMapper
from .bo.GehenBO import Gehen
from .db.GehenMapper import GehenMapper
from .bo.KommenBO import Kommen
from .db.KommenMapper import KommenMapper



class Administration(object):

    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    """
    def __init__(self):
        pass

    """
    Aktivitäten-spezifische Methoden
    """
    def create_aktivitäten(self, bezeichnung, dauer, capacity):
        """Einen Benutzer anlegen"""
        aktivitäten = Aktivitäten
        aktivitäten.timestamp = datetime.now()
        aktivitäten.bezeichnung = bezeichnung
        aktivitäten.dauer = dauer
        aktivitäten.capacity = capacity

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

    """
    User-spezifische Methoden
    """
    def create_user(self, vorname, nachname, benutzername, email, google_user_id):
        """Einen Benutzer anlegen"""
        user = User
        user.timestamp = datetime.now()
        user.vorname = vorname
        user.nachname = nachname
        user.benutzername = benutzername
        user.email = email
        user.google_user_id = google_user_id

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_all_user(self):
        """Alle Benutzer auslesen"""
        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_key(id)

    def get_user_by_name(self, nachname):
        with UserMapper() as mapper:
            return mapper.find_by_name(nachname)

    def get_user_by_google_user_id(self, google_user_id):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(google_user_id)

    def update_user(self, user):
        with UserMapper() as mapper:
            return mapper.update(user)

    def delete_user(self, user):
        with UserMapper() as mapper:
            return mapper.delete(user)



    """
    Gehen-spezifische Methoden
    """ 
    def create_gehen(self, id, zeitpunkt):
        """Gehen Eintrag anlegen"""
        gehen = Gehen
        gehen.id = id
        gehen.timestamp = datetime.now()
        gehen.zeitpunkt = zeitpunkt

        with GehenMapper() as mapper:
            return mapper.insert(gehen)

    def get_all_gehen(self):
        """Alle Gehen Einträge auslesen"""
        with GehenMapper() as mapper:
            return mapper.find_all()

    def get_gehen_by_id(self, id):
        """Den Gehen Eintrag mit der gegebenen ID auslesen."""
        with GehenMapper() as mapper:
            return mapper.find_by_key(id)

    def update_gehen(self, gehen):
        with GehenMapper() as mapper:
            return mapper.update(gehen)

    def delete_gehen(self, gehen):
        with GehenMapper() as mapper:
            return mapper.delete(gehen)


    """
    Kommen-spezifische Methoden
    """ 
    def create_kommen(self, id, zeitpunkt):
        """Kommen Eintrag anlegen"""
        kommen = Kommen
        kommen.id = id
        kommen.timestamp = datetime.now()
        kommen.zeitpunkt = zeitpunkt

        with KommenMapper() as mapper:
            return mapper.insert(kommen)

    def get_all_kommen(self):
        """Alle Kommen Einträge auslesen"""
        with KommenMapper() as mapper:
            return mapper.find_all()

    def get_kommen_by_id(self, id):
        """Den Kommen Eintrag mit der gegebenen ID auslesen."""
        with KommenMapper() as mapper:
            return mapper.find_by_key(id)

    def update_kommen(self, kommen):
        with KommenMapper() as mapper:
            return mapper.update(kommen)

    def delete_kommen(self, kommen):
        with KommenMapper() as mapper:
            return mapper.delete(kommen)


    