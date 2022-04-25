from .bo.UserBO import User
from .bo.ProjectBO import Project
from .db.UserMapper import UserMapper
from .db.ProjectMapper import ProjectMapper
from datetime import datetime


class Administration(object):

    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).
    """
    def __init__(self):
        pass

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
    Projekt-spezifische Methoden
    """
    def create_project(self, projektname, laufzeit, auftraggeber, projektleiter, availablehours, user):
        """Ein Projekt anlegen"""
        project = Project
        project.timestamp = datetime.now()
        project.projektname = projektname
        project.laufzeit = laufzeit
        project.auftraggeber = auftraggeber
        project.projektleiter = projektleiter
        project.availablehours = availablehours
        project.user = user

        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def get_all_projects(self):
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def get_project_by_id(self, id):
        with ProjectMapper() as mapper:
            return mapper.find_by_key(id)