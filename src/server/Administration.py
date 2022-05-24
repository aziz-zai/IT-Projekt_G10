from server.bo.MembershipBO import Membership
from server.db.MembershipMapper import MembershipMapper
from .bo.EreignisbuchungBo import Ereignisbuchung
from .bo.UserBO import User
from .db.AktivitätenMapper import AktivitätenMapper
from .bo.ProjectBO import Project
from .db.UserMapper import UserMapper
from .db.ProjectMapper import ProjectMapper
from datetime import datetime
from server.bo.AktivitätenBO import Aktivitäten

from server.bo.ArbeitszeitkontoBO import Arbeitszeitkonto
from .db.ArbeitszeitkontoMapper import ArbeitszeitkontoMapper

from .bo.GehenBO import Gehen
from .db.GehenMapper import GehenMapper
from .bo.KommenBO import Kommen
from .db.KommenMapper import KommenMapper
from .db.EreignisbuchungMapper import EreignisbuchungMapper
from .db.MembershipMapper import MembershipMapper
from .bo.MembershipBO import Membership

from .bo.ProjektarbeitBO import Projektarbeit
from .db.ProjektarbeitMapper import ProjektarbeitMapper
from .bo.PauseBO import Pause
from .db.PauseMapper import PauseMapper

from .bo.ZeitintervallbuchungBO import Zeitintervallbuchung
from .db.ZeitintervallbuchungMapper import ZeitintervallbuchungMapper

class Administration(object):

    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    """
    def __init__(self):
        pass

    """
    Aktivitäten-spezifische Methoden
    """
    def create_aktivitäten(self, bezeichnung, dauer, capacity, project):
        """Einen Benutzer anlegen"""
        aktivitäten = Aktivitäten
        aktivitäten.timestamp = datetime.now()
        aktivitäten.bezeichnung = bezeichnung
        aktivitäten.dauer = dauer
        aktivitäten.capacity = capacity
        aktivitäten.project = project

        with AktivitätenMapper() as mapper:
            return mapper.insert(aktivitäten)

    def get_aktivitäten_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with AktivitätenMapper() as mapper:
            return mapper.find_by_key(id)

    def get_activities_by_project(self, project):
        with AktivitätenMapper() as mapper:
            return mapper.find_all_activties_by_project(project)

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
        user = User(
        timestamp = datetime.now(),
        vorname = vorname,
        nachname = nachname,
        benutzername = benutzername,
        email = email,
        google_user_id = google_user_id)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_key(id)

    def get_user_by_google_user_id(self, google_user_id):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(google_user_id)

    def save_user(self, user):
        with UserMapper() as mapper:
            return mapper.update(user)

    def delete_user(self, id):
        with UserMapper() as mapper:
            return mapper.delete(id)


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
        
        with ProjektarbeitMapper() as mapper:
            return mapper.insert(projektarbeit)

    def get_projektarbeit_by_id(self, id):
        """Die Projektarbeit mit der gegebenen ID auslesen"""
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_key(id)

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

    def create_zeitintervallbuchung(self, zeitintervall, arbeitszeitkonto):
        zeitintervallbuchung = Zeitintervallbuchung
        zeitintervallbuchung.timestamp = datetime.now()
        zeitintervallbuchung.zeitintervall = zeitintervall.id
        zeitintervallbuchung.arbeitszeitkonto = arbeitszeitkonto

        kommen = Administration.get_kommen_by_id(self, zeitintervall.start)
        gehen = Administration.get_gehen_by_id(self, zeitintervall.ende)

        zeitdifferenz = datetime.strptime(gehen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S") - datetime.strptime(kommen.zeitpunkt.strftime("%Y-%m-%d %H:%M:%S"),"%Y-%m-%d %H:%M:%S")
        zeitdiff_sec = zeitdifferenz.total_seconds()
        offset_days = zeitdiff_sec / 86400.0    
        offset_hours = (offset_days % 1) * 24
        offset_minutes = (offset_hours % 1) * 60
        offset = "{:02d}:{:02d}:{:02d}".format(int(offset_days),int(offset_hours), int(offset_minutes))
        zeitintervallbuchung.zeitdifferenz = offset
        
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.insert(zeitintervallbuchung)

    def get_zeitintervallbuchung_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_by_key(id)

    def update_zeitintervallbuchung(self, zeitintervallbuchung):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.update(Zeitintervallbuchung)

    def delete_zeitintervallbuchung(self, Zeitintervallbuchung):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.delete(Zeitintervallbuchung)
    
    """
    Projekt-spezifische Methoden
    """
    def create_project(self, projektname, laufzeit, auftraggeber, availablehours):
        """Ein Projekt anlegen"""
        project = Project
        project.timestamp = datetime.now()
        project.projektname = projektname
        project.laufzeit = laufzeit
        project.auftraggeber = auftraggeber
        project.availablehours = availablehours

        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def get_project_by_id(self, id):
        with ProjectMapper() as mapper:
            return mapper.find_by_key(id)

    def update_project(self, project):
        with ProjectMapper() as mapper:
            return mapper.update(project)
    
    def delete_project(self, project):
        with ProjectMapper() as mapper:
            return mapper.delete(project)

    """
    Arbeitszeitkonto-spezifische Methoden 
    """
    def create_arbeitszeitkonto(self, urlaubskonto, user, arbeitsleistung, gleitzeit):
        """Einen Benutzer anlegen"""
        arbeitszeitkonto = Arbeitszeitkonto
        arbeitszeitkonto.timestamp = datetime.now()
        arbeitszeitkonto.urlaubskonto = urlaubskonto
        arbeitszeitkonto.user = user
        arbeitszeitkonto.arbeitsleistung = arbeitsleistung
        arbeitszeitkonto.gleitzeit = gleitzeit

        with ArbeitszeitkontoMapper() as mapper:
            return mapper.insert(arbeitszeitkonto)

    def get_arbeitszeitkonto_by_id(self, user):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_by_key(user)

    def get_arbeitszeitkonto_by_userID(self, userID):
        """Den Ereignisbuchung Eintrag mit der gegebenen ID auslesen."""
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.find_arbeitszeitkonto_by_userID(userID)

    def update_arbeitszeitkonto(self, arbeitszeitkonto):
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.update(arbeitszeitkonto)

    def delete_arbeitszeitkonto(self, arbeitszeitkonto):
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.delete(arbeitszeitkonto)


    """
    Membership-spezifische Methoden
    """
    def create_membership(self, user, project, projektleiter):
        membership = Membership
        membership.timestamp = datetime.now()
        membership.user = user
        membership.project = project
        membership.projektleiter = projektleiter

        with MembershipMapper() as mapper:
            return mapper.insert(membership)

    def get_membership_by_id(self, id):
        with MembershipMapper() as mapper:
            return mapper.find_by_key(id)
    
    def update_membership(self, membership):
        with MembershipMapper() as mapper:
            return mapper.update(membership)
    
    def delete_membership(self, membership):
        with MembershipMapper() as mapper:
            return mapper.delete(membership)

    def get_membership_by_project(self, project):
        with MembershipMapper() as mapper:
            return mapper.find_by_project(project)
    
    def get_membership_by_user_and_project(self, user, project):
        with MembershipMapper() as mapper:
            return mapper.find_by_user_and_project(user, project)
    
    def get_membership_by_user(self, user):
        with MembershipMapper() as mapper:
            return mapper.find_by_user(user)
       