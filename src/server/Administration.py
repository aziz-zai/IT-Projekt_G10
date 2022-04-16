from .bo.UserBO import User

from .db.UserMapper import UserMapper


class Administration(object):

    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    """
    def __init__(self):
        pass

    """
    User-spezifische Methoden
    """
    def create_user(self, vorname, nachname):
        """Einen Benutzer anlegen"""
        user = User()
        user.vorname(vorname)
        user.nachname(nachname)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_all_user(self):
        """Alle Benutzer auslesen"""

        with UserMapper() as mapper:
            return mapper.find_all()