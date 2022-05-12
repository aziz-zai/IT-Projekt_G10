from .bo.UserBO import User
from .db.AktivitätenMapper import AktivitätenMapper
from datetime import datetime
from server.bo.AktivitätenBO import Aktivitäten
from .db.UserMapper import UserMapper
from .bo.ProjektarbeitBO import Projektarbeit
from .db.ProjektarbeitMapper import ProjektarbeitMapper
from .bo.PauseBO import Pause
from .db.PauseMapper import PauseMapper



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
    def create_user(self, vorname, nachname, benutzername, email, google_user_id, arbeitszeitkonto):
        """Einen Benutzer anlegen"""
        user = User
        user.timestamp = datetime.now()
        user.vorname = vorname
        user.nachname = nachname
        user.benutzername = benutzername
        user.email = email
        user.google_user_id = google_user_id
        user.arbeitszeitkonto = arbeitszeitkonto

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


    """Projektarbeit-spezifische Methoden"""

    def create_projektarbeit(self, bezeichnung, activity, start, ende):
        """Einen Benutzer anlegen"""
        projektarbeit = Projektarbeit
        projektarbeit.timestamp = datetime.now()
        projektarbeit.start = start
        projektarbeit.ende = ende
        projektarbeit.zeitdifferenz = ende - start
        projektarbeit.bezeichnung = bezeichnung
        projektarbeit.activity = activity

        with ProjektarbeitMapper() as mapper:
            return mapper.insert(projektarbeit)

    def get_all_projektarbeiten(self):
        """Alle Projektarbeiten auslesen"""
        with ProjektarbeitMapper() as mapper:
            return mapper.find_all()

    def get_projektarbeit_by_id(self, id):
        """Die Projektarbeit mit der gegebenen ID auslesen"""
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_key(id)

    def get_projektarbeit_by_bezeichnung(self, bezeichnung):
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_bezeichnung(bezeichnung)

    def update_projektarbeit(self, projektarbeit):
        with ProjektarbeitMapper() as mapper:
            return mapper.update(projektarbeit)

    def delete_projektarbeit(self, projektarbeit):
        with ProjektarbeitMapper() as mapper:
            return mapper.delete(projektarbeit)


    """Pause-spezifische Methoden"""

    def create_pause(self, start, ende):
        """Einen Benutzer anlegen"""
        pause = Pause
        pause.timestamp = datetime.now()
        pause.start = start
        pause.ende = ende
        pause.zeitdifferenz = ende - start

        with PauseMapper() as mapper:
            return mapper.insert(pause)

    def get_all_pausen(self):
        """Alle Pausen auslesen"""
        with PauseMapper() as mapper:
            return mapper.find_all()

    def get_pause_by_id(self, id):
        """Die Pause mit der gegebenen ID auslesen"""
        with PauseMapper() as mapper:
            return mapper.find_by_key(id)

    def update_pause(self, pause):
        with PauseMapper() as mapper:
            return mapper.update(pause)

    def delete_pause(self, pause):
        with PauseMapper() as mapper:
            return mapper.delete(pause)


        
