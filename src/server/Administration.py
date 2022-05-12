from server.bo.ZeitintervallbuchungBO import Zeitintervallbuchung
from .bo.UserBO import User

from .db.AktivitätenMapper import AktivitätenMapper
from datetime import datetime
from .bo.AktivitätenBO import Aktivitäten
from .db.UserMapper import UserMapper

from .bo.AbwesenheitBO import Abwesenheit
from .db.AbwesenheitMapper import AbwesenheitMapper

from.bo.ZeitintervallbuchungBO import Zeitintervallbuchung
from.db.ZeitintervallbuchungMapper import ZeitintervallbuchungMapper



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
        arbeitszeitkonto=arbeitszeitkonto

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
            
    """Abwesenheit"""
    def creat_abwesenheit (self, abwesenheitsart, zeitintervallID, bemerkung):
        abwesenheit = Abwesenheit
        abwesenheit.timestamp = datetime.now()
        abwesenheit.abwesenheitsart = abwesenheitsart
        abwesenheit.zeitintervallID = zeitintervallID
        abwesenheit.bemerkung = bemerkung

        with AbwesenheitMapper() as mapper:             
            return mapper.insert(abwesenheit)

    def get_all_abwesenheit(self):
        """Alle Abwesenheiten auslesen"""
        with AbwesenheitMapper() as mapper:
            return mapper.find_all()

    def get_abwesenheit_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with AbwesenheitMapper() as mapper:
            return mapper.find_by_key(id)

    def get_abwesenheit_by_bemerkung(self, bemerkung):
        with AbwesenheitMapper() as mapper:
            return mapper.find_by_bemerkung(bemerkung)

    def update_abwesenheit(self, abwesenheit):
        with AbwesenheitMapper() as mapper:
            return mapper.update(abwesenheit)

    def delete_abwesenheit(self, abwesenheit):
        with AbwesenheitMapper() as mapper:
            return mapper.delete(abwesenheit)

    """Zeitintervallbuchung"""

    def create_zeitintervallbuchung(self, buchung, arbeitszeitkonto, timestamp):
        zeitintervallbuchung = Zeitintervallbuchung
        zeitintervallbuchung.timestamp = datetime.now()
        zeitintervallbuchung.buchung = buchung
        zeitintervallbuchung.arbeitszeitkonto = Arbeitszeitkonto

        with ZeitintervallbuchungMapper() as mapper:
            return mapper.insert(Zeitintervallbuchung)

    def get_all_zeitintervallbuchung(self):
        """Alle Zeitintervallbuchungen auslesen"""
        with ZeitintervallbuchungMapper() as mapper:
            return mapper.find_all()

    def get_zeitintervallbuchung_by_id(self, id):
        """Den Benutzer mit der gegebenen ID auslesen."""
        
        with ZeitintervallBuchungMapper as mapper:
            return mapper.find_by_key(id)

    def update_zeitintervallbuchung(self, zeitintervallbuchung):
        with ZeitintervallBuchungMapper() as mapper:
            return mapper.update(Zeitintervallbuchung)

    def delete_zeitintervallbuchung(self, Zeitintervallbuchung):
        with ZeitintervallBuchungMapper() as mapper:
            return mapper.delete(Zeitintervallbuchung)

