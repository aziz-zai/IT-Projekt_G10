from time import time
from server.bo.AktivitätenBO import Aktivitäten
from server.db.Mapper import Mapper


class AktivitätenMapper(Mapper):


    def __init__(self):
        super().__init__()

    def insert(self, aktivitäten: Aktivitäten) -> Aktivitäten:
        """Create user Object."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM aktivitäten ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                aktivitäten.id = maxid[0] + 1
            else:
                aktivitäten.id = 1
        command = """
            INSERT INTO aktivitäten (
                id, timestamp, bezeichnung, dauer, kapazität
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            aktivitäten.id,
            aktivitäten.timestamp,
            aktivitäten.bezeichnung,
            aktivitäten.dauer,
            aktivitäten.kapazität,
        ))
        self._cnx.commit()

        return aktivitäten

   
    