import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class UserBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} aVorname - the Vorname of this CustomerBO.
   * @param {String} aNachname - the Vorname of this CustomerBO.
   * @param {String} aBenutzername - the Vorname of this CustomerBO.
   * @param {String} aEmail - the Vorname of this CustomerBO.
   * @param {String} aGoogleUserId - the Vorname of this CustomerBO.
   * @param {String} aUrlaubstage - the Vorname of this CustomerBO.
   */
  constructor(aVorname, aNachname, aBenutzername, aEmail, aGoogleUserId, aUrlaubstage) {
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
   * @param {String} aVorname - the new firstname of this CustomerBO.
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
   * @param {*} aNachname - the new lastname of this CustomerBO.
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
   * Gets the firstname.
   */
  getBenutzername() {
    return this.benutzername;
  }

  setEmail(aEmail) {
    this.email = aEmail;
  }

  /**
   * Gets the firstname.
   */
  getEmail() {
    return this.email;
  }

  setUrlaubstage(aUrlaubstage) {
    this.urlaubstage = aUrlaubstage;
  }

  /**
   * Gets the firstname.
   */
  getUrlaubstage() {
    return this.urlaubstage;
  }

  setGoogleUserId(aGoogleUserId) {
    this.google_user_id = aGoogleUserId;
  }

  /**
   * Gets the firstname.
   */
  getGoogleUserId() {
    return this.google_user_id;
  }


  /** 
   * Returns an Array of CustomerBOs from a given JSON structure.
   */
  static fromJSON(users) {
    let result = [];

    if (Array.isArray(users)) {
      users.forEach((u) => {
        Object.setPrototypeOf(u, UserBO.prototype);
        result.push(u);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let u = users;
      Object.setPrototypeOf(u, UserBO.prototype);
      result.push(u);
    }

    return result;
  }
}