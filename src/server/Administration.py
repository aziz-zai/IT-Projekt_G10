from .bo.EreignisbuchungBo import Ereignisbuchung
from .bo.UserBO import User
from .db.AktivitätenMapper import AktivitätenMapper
from datetime import date, datetime
from server.bo.AktivitätenBO import Aktivitäten
from .db.UserMapper import UserMapper

from .bo.GehenBO import Gehen
from .db.GehenMapper import GehenMapper
from .bo.KommenBO import Kommen
from .db.KommenMapper import KommenMapper
from .db.EreignisbuchungMapper import EreignisbuchungMapper


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


    """
    Gehen-spezifische Methoden
    """ 
    def create_gehen(self,zeitpunkt):
        """Gehen Eintrag anlegen"""
        gehen = Gehen
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
    def create_kommen(self, zeitpunkt):
        """Kommen Eintrag anlegen"""
        kommen = Kommen
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


    """
    Ereignisbuchung-spezifische Methoden
    """ 
    def create_ereignisbuchung(self, arbeitszeitkonto, ereignis):
        """Ereignisbuchung anlegen"""
        ereignisbuchung = Ereignisbuchung
        ereignisbuchung.id = id
        ereignisbuchung.timestamp = datetime.now()
        ereignisbuchung.ereignis = ereignis
        ereignisbuchung.arbeitszeitkonto = arbeitszeitkonto

        with EreignisbuchungMapper() as mapper:
            return mapper.insert(ereignisbuchung)

    def get_all_ereignisbuchung(self):
        """Alle Ereignisbuchung Einträge auslesen"""
        with EreignisbuchungMapper() as mapper:
            return mapper.find_all()

    def get_ereignisbuchung_by_id(self, id):
        """Den Ereignisbuchung Eintrag mit der gegebenen ID auslesen."""
        with EreignisbuchungMapper() as mapper:
            return mapper.find_by_key(id)

    def update_ereignisbuchung(self, ereignisbuchung):
        with EreignisbuchungMapper() as mapper:
            return mapper.update(ereignisbuchung)

    def delete_ereignisbuchung(self, ereignisbuchung):
        with EreignisbuchungMapper() as mapper:
            return mapper.delete(ereignisbuchung)


    

    """Projektarbeit-spezifische Methoden"""

    def create_projektarbeit(self, start, ende, bezeichnung, activity):
        """Einen Benutzer anlegen"""
        kommen = Administration.get_kommen_by_id(self, start)
        gehen = Administration.get_gehen_by_id(self, ende)

        projektarbeit = Projektarbeit
        projektarbeit.timestamp = datetime.now()
        projektarbeit.start = start
        projektarbeit.ende = ende
        projektarbeit.bezeichnung = bezeichnung
        projektarbeit.activity = activity
        
        zeitdifferenz = datetime.strptime(gehen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S") - datetime.strptime(kommen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S")
        zeitdiff_sec = zeitdifferenz.total_seconds()
        offset_days = zeitdiff_sec / 86400.0    
        offset_hours = (offset_days % 1) * 24
        offset_minutes = (offset_hours % 1) * 60
        offset = "{:02d}:{:02d}:{:02d}".format(int(offset_days),int(offset_hours), int(offset_minutes))
        projektarbeit.zeitdifferenz = offset
        

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

    def update_projektarbeit(self, projektarbeit: Projektarbeit):
        kommen = Administration.get_kommen_by_id(self, projektarbeit.start)
        gehen = Administration.get_gehen_by_id(self, projektarbeit.ende)
        zeitdifferenz = datetime.strptime(gehen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S") - datetime.strptime(kommen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S")
        zeitdiff_sec = zeitdifferenz.total_seconds()
        offset_days = zeitdiff_sec / 86400.0    
        offset_hours = (offset_days % 1) * 24
        offset_minutes = (offset_hours % 1) * 60
        offset = "{:02d}:{:02d}:{:02d}".format(int(offset_days),int(offset_hours), int(offset_minutes))
        projektarbeit.zeitdifferenz = offset
        projektarbeit.timestamp = datetime.now()
        with ProjektarbeitMapper() as mapper:
            return mapper.update(projektarbeit)

    def delete_projektarbeit(self, projektarbeit):
        with ProjektarbeitMapper() as mapper:
            return mapper.delete(projektarbeit)


    """Pause-spezifische Methoden"""

    def create_pause(self, start, ende):
        """Einen Benutzer anlegen"""
        kommen = Administration.get_kommen_by_id(self, start)
        gehen = Administration.get_gehen_by_id(self, ende)

        pause = Pause
        pause.timestamp = datetime.now()
        pause.start = start
        pause.ende = ende

        zeitdifferenz = datetime.strptime(gehen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S") - datetime.strptime(kommen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S")
        zeitdiff_sec = zeitdifferenz.total_seconds()
        offset_days = zeitdiff_sec / 86400.0    
        offset_hours = (offset_days % 1) * 24
        offset_minutes = (offset_hours % 1) * 60
        offset = "{:02d}:{:02d}:{:02d}".format(int(offset_days),int(offset_hours), int(offset_minutes))
        pause.zeitdifferenz = offset

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
