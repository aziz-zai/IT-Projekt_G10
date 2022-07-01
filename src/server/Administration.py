from server.bo.ZeitintervallBO import Zeitintervall
from server.db.ZeitintervallMapper import ZeitintervallMapper
from server.bo.EreignisBO import Ereignis
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
from .db.EreignisMapper import EreignisMapper


from .bo.ProjektarbeitBO import Projektarbeit
from .db.ProjektarbeitMapper import ProjektarbeitMapper
from .bo.PauseBO import Pause
from .db.PauseMapper import PauseMapper

from .bo.ZeitintervallbuchungBO import Zeitintervallbuchung
from .db.ZeitintervallbuchungMapper import ZeitintervallbuchungMapper
from.bo.AbwesenheitBO import Abwesenheit
from .db.AbwesenheitMapper import AbwesenheitMapper

class Administration(object):

    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    """
    def __init__(self):
        pass

    """
    ANCHOR Aktivitäten-spezifische Methoden
    """
    def create_aktivitäten(self, bezeichnung, dauer, capacity, project):
        aktivitäten = Aktivitäten()
        aktivitäten.set_bezeichnung(bezeichnung)
        aktivitäten.set_dauer(dauer)
        aktivitäten.set_capacity(capacity)
        aktivitäten.set_project(project)

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
    
    def update_aktivitäten_capacity(self, aktivität, zeitintervallbuchung):

        arbeitsstunden = float(zeitintervallbuchung.get_zeitdifferenz())
        akt = self.get_aktivitäten_by_id(aktivität)
        aktuelle_capacity = akt.get_capacity()
        updated_capacity = aktuelle_capacity - arbeitsstunden

        up_akt = Aktivitäten()
        up_akt.set_id(akt.get_id())
        up_akt.set_timestamp(datetime.now())
        up_akt.set_bezeichnung(akt.get_bezeichnung())
        up_akt.set_dauer(akt.get_dauer())
        up_akt.set_capacity(updated_capacity)
        up_akt.set_project(akt.get_project())
        self.update_aktivitäten(up_akt)

    def delete_aktivitäten(self, aktivitäten):
        with AktivitätenMapper() as mapper:
            return mapper.delete(aktivitäten)

    """
    ANCHOR User-spezifische Methoden
    """
    def create_user(self, vorname, nachname, benutzername, email, google_user_id):
        """Einen Benutzer anlegen"""
        user = User()
        user.set_vorname(vorname)
        user.set_nachname(nachname)
        user.set_benutzername(benutzername)
        user.set_email(email)
        user.set_google_user_id(google_user_id) 
        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_key(id)

    def get_user_by_google_user_id(self, google_user_id):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(google_user_id)
    
    def get_potential_users_for_project(self, user, project):
        with UserMapper() as mapper:
            return mapper.find_potential_users(user, project)

    def save_user(self, user):
        with UserMapper() as mapper:
            return mapper.update(user)

    def delete_user(self, id):
        with UserMapper() as mapper:
            return mapper.delete(id)


    """
    ANCHOR Gehen-spezifische Methoden
    """ 
    def create_gehen(self,zeitpunkt, bezeichnung):
        """Gehen Eintrag anlegen"""
        gehen = Gehen()
        gehen.set_zeitpunkt(zeitpunkt)
        gehen.set_bezeichnung(bezeichnung)

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
    ANCHOR Kommen-spezifische Methoden
    """ 
    def create_kommen(self, zeitpunkt, bezeichnung):
        """Kommen Eintrag anlegen"""
        kommen = Kommen()
        kommen.set_zeitpunkt(zeitpunkt)
        kommen.set_bezeichnung(bezeichnung)
        
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
    ANCHOR Ereignisbuchung-spezifische Methoden
    """ 
    def create_ereignisbuchung(self, erstellt_von, erstellt_für, ist_buchung, ereignis, bezeichnung):
        """Ereignisbuchung anlegen"""
        ereignisbuchung = Ereignisbuchung()
        ereignisbuchung.set_erstellt_von(erstellt_von)
        ereignisbuchung.set_erstellt_für(erstellt_für)
        ereignisbuchung.set_ist_buchung(ist_buchung)
        ereignisbuchung.set_ereignis(ereignis)
        ereignisbuchung.set_bezeichnung(bezeichnung)

        with EreignisbuchungMapper() as mapper:
            return mapper.insert(ereignisbuchung)

    def get_ereignisbuchung_by_id(self, id):
        """Den Ereignisbuchung Eintrag mit der gegebenen ID auslesen."""
        with EreignisbuchungMapper() as mapper:
            return mapper.find_by_key(id)

    def get_soll_ereignisbuchungen_by_user(self, erstellt_für):
        with EreignisbuchungMapper() as mapper:
            return mapper.find_soll_ereignisbuchungen_by_user(erstellt_für)
    
    def get_soll_ereignisbuchungen_by_zeitspanne(self, erstellt_für, startFilter, endFilter):
        ereignisbuchungen = self.get_soll_ereignisbuchungen_by_user(erstellt_für)
        if((startFilter != "null" or "") and (endFilter != "null" or "")):
            startTime = datetime.strptime(startFilter, "%Y-%m-%dT%H:%M")
            endTime = datetime.strptime(endFilter, "%Y-%m-%dT%H:%M")
            ereignisbuchungen_in_time = []
            for(buchung) in ereignisbuchungen:
                if(buchung.get_bezeichnung()=='Arbeitsbeginn'):
                    ereignis = self.get_kommen_by_id(buchung.get_ereignis())
                elif(buchung.get_bezeichnung()=='Arbeitsende'):
                    ereignis = self.get_gehen_by_id(buchung.get_ereignis())
                else:
                    ereignis = self.get_ereignis_by_id(buchung.get_ereignis())
                ereignisTime = datetime.strptime(ereignis.get_zeitpunkt(), "%Y-%m-%dT%H:%M")
                if(startTime <= ereignisTime <= endTime):
                    ereignisbuchungen_in_time.append(buchung)
            return ereignisbuchungen_in_time
        else:
            return ereignisbuchungen

    def get_ist_eregnisbuchungen_by_user(self, erstellt_für):
        with EreignisbuchungMapper() as mapper:
            return mapper.find_ist_ereignisbuchungen_by_user(erstellt_für)

    def get_ist_eregnisbuchungen_by_zeitspanne(self, erstellt_für, startFilter, endFilter):
        ereignisbuchungen = self.get_ist_eregnisbuchungen_by_user(erstellt_für)
        if((startFilter != "null" or "") and (endFilter != "null" or "")):
            startTime = datetime.strptime(startFilter, "%Y-%m-%dT%H:%M")
            endTime = datetime.strptime(endFilter, "%Y-%m-%dT%H:%M")
            ereignisbuchungen_in_time = []
            for(buchung) in ereignisbuchungen:
                if(buchung.get_bezeichnung()=='Arbeitsbeginn'):
                    ereignis = self.get_kommen_by_id(buchung.get_ereignis())
                elif(buchung.get_bezeichnung()=='Arbeitsende'):
                    ereignis = self.get_gehen_by_id(buchung.get_ereignis())
                else:
                    ereignis = self.get_ereignis_by_id(buchung.get_ereignis())
                ereignisTime = datetime.strptime(ereignis.get_zeitpunkt(), "%Y-%m-%dT%H:%M")
                if(startTime <= ereignisTime <= endTime):
                    ereignisbuchungen_in_time.append(buchung)
            return ereignisbuchungen_in_time
        else:
            return ereignisbuchungen

    def update_ereignisbuchung(self, ereignisbuchung):
        with EreignisbuchungMapper() as mapper:
            return mapper.update(ereignisbuchung)

    def delete_ereignisbuchung(self, ereignisbuchung):
        with EreignisbuchungMapper() as mapper:
            return mapper.delete(ereignisbuchung)


    """ANCHOR Projektarbeit-spezifische Methoden
    """

    def create_projektarbeit(self, bezeichnung, beschreibung, start, ende, activity):
        """Einen Benutzer anlegen"""

        projektarbeit = Projektarbeit()
        projektarbeit.set_bezeichnung(bezeichnung)
        projektarbeit.set_start(start)
        projektarbeit.set_ende(ende)
        projektarbeit.set_beschreibung(beschreibung)
        projektarbeit.set_activity(activity)
        
        with ProjektarbeitMapper() as mapper:
            return mapper.insert(projektarbeit)

    def get_projektarbeit_by_id(self, id):
        """Die Projektarbeit mit der gegebenen ID auslesen"""
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_key(id)

    def get_projektarbeit_by_activity_id(self, activity):
        """Die Projektarbeit anhand der Aktivitäten ID auslesen"""
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_activity_id(activity)

    def get_projektarbeit_by_start(self, start):
        """Die Projektarbeit anhand der Aktivitäten ID auslesen"""
        with ProjektarbeitMapper() as mapper:
            return mapper.find_by_start(start)

    def update_projektarbeit(self, projektarbeit: Projektarbeit):
        with ProjektarbeitMapper() as mapper:
            return mapper.update(projektarbeit)

    def delete_projektarbeit(self, projektarbeit):
        with ProjektarbeitMapper() as mapper:
            return mapper.delete(projektarbeit)


    """ ANCHOR Pause-spezifische Methoden
    """

    def create_pause(self, bezeichnung, start, ende):
        """Einen Benutzer anlegen"""
        pause = Pause()
        pause.set_bezeichnung(bezeichnung)
        pause.set_start(start)
        pause.set_ende(ende)

        with PauseMapper() as mapper:
            return mapper.insert(pause)

    def get_pause_by_id(self, id):
        """Die Pause mit der gegebenen ID auslesen"""
        with PauseMapper() as mapper:
            return mapper.find_by_key(id)
    
    def get_pause_by_beginn(self, beginn):
        """Die Pause mit der gegebenen ID auslesen"""
        with PauseMapper() as mapper:
            return mapper.find_by_beginn(beginn)

    def update_pause(self, pause: Pause):
        with PauseMapper() as mapper:
            return mapper.update(pause)

    def delete_pause(self, pause):
        with PauseMapper() as mapper:
            return mapper.delete(pause)

    """ ANCHOR Zeitintervallbuchung-spezifische Methoden
    """

    def create_zeitintervallbuchung(self, zeitintervall, ist_buchung, erstellt_von, erstellt_für, bezeichnung):
        zeitintervallbuchung = Zeitintervallbuchung()
        zeitintervallbuchung.set_zeitintervall(zeitintervall) 
        zeitintervallbuchung.set_ist_buchung(ist_buchung)
        zeitintervallbuchung.set_erstellt_von(erstellt_von)
        zeitintervallbuchung.set_erstellt_für(erstellt_für)
        zeitintervallbuchung.set_bezeichnung(bezeichnung) 
        zeitintervall_bez = zeitintervallbuchung.get_bezeichnung()
        adm = Administration()
        zeitinter = None
        if zeitintervall_bez == "Projektarbeit":
            zeitinter = adm.get_projektarbeit_by_id(zeitintervall)
            kommen = adm.get_kommen_by_id(zeitinter.get_start())
            gehen = adm.get_gehen_by_id(zeitinter.get_ende())
            zeitdifferenz = datetime.strptime(gehen.get_zeitpunkt(),"%Y-%m-%dT%H:%M") - datetime.strptime(kommen.get_zeitpunkt(),"%Y-%m-%dT%H:%M")
        elif zeitintervall_bez == "Projektlaufzeit":
            zeitinter = adm.get_zeitintervall_by_id(zeitintervall)
            start_ereignis = adm.get_ereignis_by_id(zeitinter.get_start())
            end_ereignis = adm.get_ereignis_by_id(zeitinter.get_ende())
            zeitdifferenz = datetime.strptime(end_ereignis.get_zeitpunkt(),"%Y-%m-%dT%H:%M") - datetime.strptime(start_ereignis.get_zeitpunkt(),"%Y-%m-%dT%H:%M")
        elif zeitintervall_bez == "Pause":
            zeitinter = adm.get_pause_by_id(zeitintervall)
            start_ereignis = adm.get_ereignis_by_id(zeitinter.get_start())
            end_ereignis = adm.get_ereignis_by_id(zeitinter.get_ende())
            zeitdifferenz = datetime.strptime(end_ereignis.get_zeitpunkt(),"%Y-%m-%dT%H:%M") - datetime.strptime(start_ereignis.get_zeitpunkt(),"%Y-%m-%dT%H:%M")
        elif zeitintervall_bez == "Abwesenheit":
            zeitinter = adm.get_abwesenheit_by_id(zeitintervall)
            start_ereignis = adm.get_ereignis_by_id(zeitinter.get_start())
            end_ereignis = adm.get_ereignis_by_id(zeitinter.get_ende())
            zeitdifferenz = datetime.strptime(end_ereignis.get_zeitpunkt(),"%Y-%m-%dT%H:%M") - datetime.strptime(start_ereignis.get_zeitpunkt(),"%Y-%m-%dT%H:%M")
        zeitdiff_sec = zeitdifferenz.total_seconds()   
        offset_hours = zeitdiff_sec / 3600
        offset_minutes = (offset_hours % 1) * 60
        offset = "{:02d}.{:02d}".format(int(offset_hours), int(offset_minutes))
        zeitintervallbuchung.set_zeitdifferenz(offset)
        
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.insert(zeitintervallbuchung)

    def get_zeitintervallbuchung_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_by_key(id)

    def get_soll_projektarbeit_buchungen_by_user(self, erstellt_für):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_soll_projektarbeit_buchungen_by_user(erstellt_für)

    def get_soll_zeitintervallbuchungen_by_user(self, erstellt_für):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_soll_buchungen_by_user(erstellt_für)
    
    def get_soll_projektarbeitbuchungen_by_zeitspanne(self, user, startFilter, endFilter, activity):
        zeitintervallbuchungen = self.get_soll_zeitintervallbuchungen_by_zeitspanne(user, startFilter, endFilter)
        result=[]
        for buchung in zeitintervallbuchungen:
            projektarbeit = self.get_projektarbeit_by_id(buchung.get_zeitintervall())
            if ((buchung.get_bezeichnung() == 'Projektarbeit') and (projektarbeit.get_activity() == activity)):
                result.append(buchung)
        return result

    def get_ist_projektarbeitbuchungen_by_zeitspanne(self, user, startFilter, endFilter, activity):
        zeitintervallbuchungen = self.get_ist_zeitintervallbuchungen_by_zeitspanne(user, startFilter, endFilter)
        result=[]
        for buchung in zeitintervallbuchungen:
            projektarbeit = self.get_projektarbeit_by_id(buchung.get_zeitintervall())
            if ((buchung.get_bezeichnung() == 'Projektarbeit') and (projektarbeit.get_activity() == activity)):
                result.append(buchung)
        return result

    def get_ist_buchungen_by_project(self, user, project):
        buchungen_of_user = self.get_ist_zeitintervallbuchungen_by_user(user)
        result = []
        for buchung in buchungen_of_user:
            if (buchung.get_bezeichnung() == 'Projektarbeit'):
                projektarbeit = self.get_projektarbeit_by_id(buchung.get_zeitintervall())
                aktivität = self.get_aktivitäten_by_id(projektarbeit.get_activity())
                if (aktivität.get_project() == project):
                    result.append(buchung)
        return result

    def get_soll_buchungen_by_project(self, user, project):
        buchungen_of_user = self.get_soll_zeitintervallbuchungen_by_user(user)
        result = []
        for buchung in buchungen_of_user:
            if (buchung.get_bezeichnung() == 'Projektarbeit'):
                projektarbeit = self.get_projektarbeit_by_id(buchung.get_zeitintervall())
                aktivität = self.get_aktivitäten_by_id(projektarbeit.get_activity())
                if (aktivität.get_project() == project):
                    result.append(buchung)
        return result
    
    def get_soll_zeitintervallbuchungen_by_zeitspanne(self, user, startFilter, endFilter):
        zeitintervallbuchungen = self.get_soll_zeitintervallbuchungen_by_user(user)
        if((startFilter != "null" or "") and (endFilter != "null" or "")):
            startTime = datetime.strptime(startFilter, "%Y-%m-%dT%H:%M")
            endTime = datetime.strptime(endFilter, "%Y-%m-%dT%H:%M")
            zeitintervallbuchungen_in_time = []
            for(buchung) in zeitintervallbuchungen:
                if(buchung.get_bezeichnung()=='Projektarbeit'):
                    zeitintervall = self.get_projektarbeit_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_kommen_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_gehen_by_id(zeitintervall.get_ende())
                elif buchung.get_bezeichnung() == "Projektlaufzeit":
                    zeitintervall = self.get_zeitintervall_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_ereignis_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_ereignis_by_id(zeitintervall.get_ende())
                elif buchung.get_bezeichnung() == "Pause":
                    zeitintervall = self.get_pause_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_ereignis_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_ereignis_by_id(zeitintervall.get_ende())
                elif buchung.get_bezeichnung() == "Abwesenheit":
                    zeitintervall = self.get_abwesenheit_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_ereignis_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_ereignis_by_id(zeitintervall.get_ende())
                ereignis1Time = datetime.strptime(ereignis1.get_zeitpunkt(), "%Y-%m-%dT%H:%M")
                ereignis2Time = datetime.strptime(ereignis2.get_zeitpunkt(), "%Y-%m-%dT%H:%M")
                if((startTime <= ereignis1Time <= endTime) and (startTime <= ereignis2Time <= endTime)):
                    zeitintervallbuchungen_in_time.append(buchung)
            return zeitintervallbuchungen_in_time
        else:
            return zeitintervallbuchungen
    
    def get_ist_zeitintervallbuchungen_by_zeitspanne(self, user, startFilter, endFilter):
        zeitintervallbuchungen = self.get_ist_zeitintervallbuchungen_by_user(user)
        if((startFilter != "null" or "") and (endFilter != "null" or "")):
            startTime = datetime.strptime(startFilter, "%Y-%m-%dT%H:%M")
            endTime = datetime.strptime(endFilter, "%Y-%m-%dT%H:%M")
            zeitintervallbuchungen_in_time = []
            for(buchung) in zeitintervallbuchungen:
                if(buchung.get_bezeichnung()=='Projektarbeit'):
                    zeitintervall = self.get_projektarbeit_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_kommen_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_gehen_by_id(zeitintervall.get_ende())
                elif buchung.get_bezeichnung() == "Projektlaufzeit":
                    zeitintervall = self.get_zeitintervall_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_ereignis_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_ereignis_by_id(zeitintervall.get_ende())
                elif buchung.get_bezeichnung() == "Pause":
                    zeitintervall = self.get_pause_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_ereignis_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_ereignis_by_id(zeitintervall.get_ende())
                elif buchung.get_bezeichnung() == "Abwesenheit":
                    zeitintervall = self.get_abwesenheit_by_id(buchung.get_zeitintervall())
                    ereignis1 = self.get_ereignis_by_id(zeitintervall.get_start())
                    ereignis2 = self.get_ereignis_by_id(zeitintervall.get_ende())
                ereignis1Time = datetime.strptime(ereignis1.get_zeitpunkt(), "%Y-%m-%dT%H:%M")
                ereignis2Time = datetime.strptime(ereignis2.get_zeitpunkt(), "%Y-%m-%dT%H:%M")
                if((startTime <= ereignis1Time <= endTime) and (startTime <= ereignis2Time <= endTime)):
                    zeitintervallbuchungen_in_time.append(buchung)
            return zeitintervallbuchungen_in_time
        else:
            return zeitintervallbuchungen

    def get_ist_zeitintervallbuchungen_by_user(self, erstellt_für):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_ist_buchungen_by_user(erstellt_für)

    def get_ist_projektarbeit_buchungen_by_user(self, erstellt_für):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_ist_projektarbeit_buchungen_by_user(erstellt_für)
    
    def get_pause_buchungen_by_user(self, user):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_pause_buchungen_by_user(user)

    def get_all_urlaubs_buchungen(self,user):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_all_urlaubs_buchungen(user)
    
    def get_all_urlaub_krank_buchungen(self,user):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_all_urlaub_krank_buchungen(user)

    def update_zeitintervallbuchung(self, zeitintervallbuchung):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.update(zeitintervallbuchung)

    def delete_zeitintervallbuchung(self, Zeitintervallbuchung):
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.delete(Zeitintervallbuchung)
    
    """
    ANCHOR Projekt-spezifische Methoden
    """
    def create_project(self, projektname, laufzeit, auftraggeber, availablehours):
        """Ein Projekt anlegen"""
        project = Project()
        project.set_projektname(projektname)
        project.set_laufzeit(laufzeit)
        project.set_auftraggeber(auftraggeber)
        project.set_availablehours(availablehours)

        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def get_project_by_id(self, id):
        with ProjectMapper() as mapper:
            return mapper.find_by_key(id)

    def get_projectlaufzeit_by_id(self, id):
        project=self.get_project_by_id(id)
        with ProjectMapper() as mapper:
            return mapper.find_laufzeit_by_key(project)

    def get_project_by_activity(self, activity):
        with ProjectMapper() as mapper:
            return mapper.find_by_activity(activity)

    def update_project(self, project):
        with ProjectMapper() as mapper:
            return mapper.update(project)
    
    def update_project_availablehours(self, activity, zeitintervallbuchung):
        project = self.get_project_by_activity(activity)

        aktuelle_availablehours = project.get_availablehours()
        arbeitsstunden = float(zeitintervallbuchung.get_zeitdifferenz())
        updated_availablehours = aktuelle_availablehours - arbeitsstunden

        pro = Project()
        pro.set_id(project.get_id())
        pro.set_timestamp(datetime.now())
        pro.set_projektname(project.get_projektname())
        pro.set_auftraggeber(project.get_auftraggeber())
        pro.set_availablehours(updated_availablehours)
        pro.set_laufzeit(project.get_laufzeit())
        self.update_project(pro)
    
    def delete_project(self, project):
        with ProjectMapper() as mapper:
            return mapper.delete(project)

    """
    ANCHOR Arbeitszeitkonto-spezifische Methoden 
    """
    def create_arbeitszeitkonto(self, urlaubskonto, user, arbeitsleistung, gleitzeit):
        """Einen Benutzer anlegen"""
        arbeitszeitkonto = Arbeitszeitkonto()
        arbeitszeitkonto.set_urlaubskonto(urlaubskonto)
        arbeitszeitkonto.set_user(user)
        arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
        arbeitszeitkonto.set_gleitzeit(gleitzeit)

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
    
    def update_arbeitszeitkonto_ist_arbeitsleistung(self, user):
        arbeitszeitkonto = self.get_arbeitszeitkonto_by_userID(user)
        ist_zeitintervallbuchungen = self.get_ist_projektarbeit_buchungen_by_user(user)
        urlaub_krank_zeitintervallbuchungen = self.get_all_urlaub_krank_buchungen(user)
        pause_zeitintervallbuchungen = self.get_pause_buchungen_by_user(user)
        ist_stunden=0
        for buchung in ist_zeitintervallbuchungen:
            ist_stunden += float(buchung.get_zeitdifferenz())
        urlaub_krank_stunden=0
        for buchung in urlaub_krank_zeitintervallbuchungen:
            urlaub_krank_stunden += float(buchung.get_zeitdifferenz())
        pause_stunden=0
        for buchung in pause_zeitintervallbuchungen:
            pause_stunden += float(buchung.get_zeitdifferenz())
        arbeitsleistung = (ist_stunden - pause_stunden) + (urlaub_krank_stunden/3)
        print(f"ist_stunden -> {ist_stunden}")
        print(f"pause_stunden -> {pause_stunden}")
        print(f"arbeitsleistung -> {arbeitsleistung}")
        print(f"urlaub_krank -> {urlaub_krank_stunden/3}")
        arbeitszeitkonto.set_timestamp(datetime.now())
        arbeitszeitkonto.set_arbeitsleistung(arbeitsleistung)
        self.update_arbeitszeitkonto(arbeitszeitkonto)
    
    def update_arbeitszeitkonto_gleitzeit(self, user):
        arbeitszeitkonto = self.get_arbeitszeitkonto_by_userID(user)
        aktuelle_arbeitsleistung = arbeitszeitkonto.get_arbeitsleistung() 
        soll_zeitintervallbuchungen = self.get_soll_projektarbeit_buchungen_by_user(user)

        soll_stunden=0
        for buchung in soll_zeitintervallbuchungen:
            soll_stunden += float(buchung.get_zeitdifferenz())
        soll_ist_diff = aktuelle_arbeitsleistung - soll_stunden
        gleitzeit = soll_ist_diff
        arbeitszeitkonto.set_gleitzeit(gleitzeit)
        print(f"soll_ist -> {soll_ist_diff}")
        print(f"soll_stunden -> {soll_stunden}")
        arbeitszeitkonto.set_timestamp(datetime.now())
        self.update_arbeitszeitkonto(arbeitszeitkonto)
    
    def update_arbeitszeitkonto_abwesenheit(self, user):
        arbeitszeitkonto = self.get_arbeitszeitkonto_by_userID(user)
        benutzer = self.get_user_by_id(user)
        urlaubskonto = benutzer.get_urlaubstage()
        urlaubs_buchungen = self.get_all_urlaubs_buchungen(user)

        urlaubs_stunden=0
        for buchung in urlaubs_buchungen:
            urlaubs_stunden += float(buchung.get_zeitdifferenz())
        
        gebuchte_urlaubstage = urlaubs_stunden/24

        updated_urlaubskonto = urlaubskonto - gebuchte_urlaubstage
        arbeitszeitkonto.set_urlaubskonto(updated_urlaubskonto)
        self.update_arbeitszeitkonto(arbeitszeitkonto) 
    
    def delete_arbeitszeitkonto(self, arbeitszeitkonto):
        with ArbeitszeitkontoMapper() as mapper:
            return mapper.delete(arbeitszeitkonto)


    """
    ANCHOR Membership-spezifische Methoden
    """
    def create_membership(self, user, project, projektleiter):
        membership = Membership()
        membership.set_user(user)
        membership.set_project(project)
        membership.set_projektleiter(projektleiter)

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
    
    def get_members_by_project(self, project):
        with MembershipMapper() as mapper:
            return mapper.find_members_by_project(project)

    def get_projektleiter_by_project(self, project):
        with MembershipMapper() as mapper:
            return mapper.find_projektleiter_by_project(project)
    
    def get_membership_by_user_and_project(self, user, project):
        with MembershipMapper() as mapper:
            return mapper.find_by_user_and_project(user, project)
    
    def get_membership_by_user(self, user):
        with MembershipMapper() as mapper:
            return mapper.find_by_user(user)
       

    """
    ANCHOR Ereignis-spezifische Methoden
    """ 
    def create_ereignis(self, zeitpunkt, bezeichnung):
        """Ereignis anlegen"""
        ereignis = Ereignis()
        ereignis.set_zeitpunkt(zeitpunkt)
        ereignis.set_bezeichnung(bezeichnung)

        with EreignisMapper() as mapper:
            return mapper.insert(ereignis)

    def get_ereignis_by_id(self, id):
        """Den Ereignis Eintrag mit der gegebenen ID auslesen."""
        with EreignisMapper() as mapper:
            return mapper.find_by_key(id)

    def update_ereignis(self, ereignis):
        with EreignisMapper() as mapper:
            return mapper.update(ereignis)

    def delete_ereignis(self, ereignis):
        with EreignisMapper() as mapper:
            return mapper.delete(ereignis)

    """
    ANCHOR Abwesenheit-spezifische Methoden
    """ 

    def create_abwesenheit(self, start, ende, abwesenheitsart, bezeichnung):
        abwesenheit = Abwesenheit()
        abwesenheit.set_start(start)
        abwesenheit.set_ende(ende)
        abwesenheit.set_abwesenheitsart(abwesenheitsart)
        abwesenheit.set_bezeichnung(bezeichnung)

        with AbwesenheitMapper() as mapper:             
            return mapper.insert(abwesenheit)
    def get_abwesenheitsart(self, abwesenheitsart):
        if(abwesenheitsart == 'Urlaub'):
            return 1
        elif(abwesenheitsart == 'Krankheitsausfall'):
            return 2
        elif(abwesenheitsart == 'Gleitzeit'):
            return 3

    def get_abwesenheit_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with AbwesenheitMapper() as mapper:
            return mapper.find_by_key(id)

    def update_abwesenheit(self, abwesenheit):
        with AbwesenheitMapper() as mapper:
            return mapper.update(abwesenheit)

    def delete_abwesenheit(self, abwesenheit):
        with AbwesenheitMapper() as mapper:
            return mapper.delete(abwesenheit)

    """
    ANCHOR Zeitintervall-spezifische Methoden
    """ 

    def create_zeitintervall(self, bezeichnung, start, ende):
        zeitintervall = Zeitintervall()
        zeitintervall.set_start(start)
        zeitintervall.set_ende(ende)
        zeitintervall.set_bezeichnung(bezeichnung)

        with ZeitintervallMapper() as mapper:             
            return mapper.insert(zeitintervall)

    def get_zeitintervall_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with ZeitintervallMapper() as mapper:
            return mapper.find_by_key(id)

    def update_zeitintervall(self, zeitintervall):
        with ZeitintervallMapper() as mapper:
            return mapper.update(zeitintervall)

    def delete_zeitintervall(self, zeitintervall):
        with ZeitintervallMapper() as mapper:
            return mapper.delete(zeitintervall)