from .BusinessObject import BusinessObject
from datetime import datetime

class Membership(BusinessObject):
    def __init__(self, user: int, project: int, projektleiter: bool,
    timestamp: datetime = datetime.now, id: int = 0):

        self.user = user
        self.project = project
        self.projektleiter = projektleiter

        super().__init__(timestamp=timestamp, id=id)
    