import BusinessObject from "./BusinessObject";

/**
 * Represents a User
 */
export default class UserBO extends BusinessObject {
  /**
   * Constructs a UserBO object with a given firstname and lastname.
   *
   * @param {String} aVorname -Attribut of UserBO.
   * @param {String} aNachname -Attribut of UserBO.
   * @param {String} aBenutzername -Attribut of UserBO.
   * @param {String} aEmail -Attribut of UserBO.
   * @param {String} aGoogleUserId -Attribut of UserBO.
   * @param {String} aUrlaubstage -Attribut of UserBO.
   */
  constructor(
    aVorname,
    aNachname,
    aBenutzername,
    aEmail,
    aGoogleUserId,
    aUrlaubstage
  ) {
    super();
    this.vorname = aVorname;
    this.nachname = aNachname;
    this.benutzername = aBenutzername;
    this.email = aEmail;
    this.google_user_id = aGoogleUserId;
    this.urlaubstage = aUrlaubstage;
  }

  /**
   * Sets a new firstname.
   *
   * @param {String} aVorname - the new firstname of this UserBO.
   */
  setVorname(aVorname) {
    this.vorname = aVorname;
  }

  /**
   * Gets the firstname.
   */
  getVorname() {
    return this.vorname;
  }

  /**
   * Sets a new lastname.
   *
   * @param {*} aNachname - the new lastname of this UserBO.
   */
  setNachname(aNachname) {
    this.nachname = aNachname;
  }

  /**
   * Gets the Nachname.
   */
  getNachname() {
    return this.nachname;
  }

  setBenutzername(aBenutzername) {
    this.benutzername = aBenutzername;
  }

  /**
   * Gets the benutzername.
   */
  getBenutzername() {
    return this.benutzername;
  }

  setEmail(aEmail) {
    this.email = aEmail;
  }


  getEmail() {
    return this.email;
  }

  setUrlaubstage(aUrlaubstage) {
    this.urlaubstage = aUrlaubstage;
  }


  getUrlaubstage() {
    return this.urlaubstage;
  }

  setGoogleUserId(aGoogleUserId) {
    this.google_user_id = aGoogleUserId;
  }

  getGoogleUserId() {
    return this.google_user_id;
  }

  /**
   * Returns an Array of UserBOs from a given JSON structure.
   */
  static fromJSON(users) {
    let result = [];

    if (Array.isArray(users)) {
      users.forEach((u) => {
        Object.setPrototypeOf(u, UserBO.prototype);
        result.push(u);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let u = users;
      Object.setPrototypeOf(u, UserBO.prototype);
      result.push(u);
    }

    return result;
  }
}
