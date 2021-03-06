from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.Administration import Administration


def secured(function):
    """Decorator zur Google Firebase-basierten Authentifizierung von Benutzern

    POLICY: Die hier demonstrierte Policy ist, dass jeder, der einen durch Firebase akzeptierten
    Account besitzt, sich an diesem System anmelden kann. Bei jeder Anmeldung werden Klarname,
    Mail-Adresse sowie die Google User ID in unserem System gespeichert bzw. geupdated. Auf diese
    Weise könnte dann für eine Erweiterung des Systems auf jene Daten zurückgegriffen werden.
    """
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Verify Firebase auth.
        id_token = request.cookies.get("token")
        error_message = None
        claims = None
        objects = None

        if id_token:
            try:
                # Verify the token against the Firebase Auth API. This example
                # verifies the token on each page load. For improved performance,
                # some applications may wish to cache results in an encrypted
                # session store (see for instance
                # http://flask.pocoo.org/docs/1.0/quickstart/#sessions).
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter
                )

                if claims is not None:

                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    benutzername = claims.get("name")

                    adm = Administration()
                    user = adm.get_user_by_google_user_id(google_user_id=google_user_id)
                    if user is not None:
                        """Fall: Der Benutzer ist unserem System bereits bekannt.
                        Wir gehen davon aus, dass die google_user_id sich nicht ändert.
                        Wohl aber können sich der zugehörige Klarname (name) und die
                        E-Mail-Adresse ändern. Daher werden diese beiden Daten sicherheitshalber
                        in unserem System geupdated."""
                        user.email = email
                        user.benutzername = benutzername
                        user.google_user_id = google_user_id
                        adm.save_user(user=user)
                    else:
                        """Fall: Der Benutzer war bislang noch nicht eingelogged.
                        Wir legen daher ein neues User-Objekt an, um dieses ggf. später
                        nutzen zu können.
                        """
                        createdUser = adm.create_user(
                            "", "", benutzername, email, google_user_id
                        )
                        adm.create_arbeitszeitkonto(
                            urlaubskonto=createdUser.get_urlaubstage(),
                            user=createdUser.get_id(),
                            arbeitsleistung=0,
                            gleitzeit=0,
                        )
                    print(request.method, request.path, "angefragt durch:", email)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return "", 401  # UNAUTHORIZED !!!
            except ValueError as exc:
                # This will be raised if the token is expired or any other
                # verification checks fail.
                error_message = str(exc)
                return exc, 401  # UNAUTHORIZED !!!

        return "", 401  # UNAUTHORIZED !!!

    return wrapper
