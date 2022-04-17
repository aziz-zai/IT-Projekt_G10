import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class UserBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} aVorname - the Vorname of this CustomerBO.
   * @param {String} aVorname - the Vorname of this CustomerBO.
   */
  constructor(aVorname, aNachname) {
    super();
    this.vorname = aVorname;
    this.nachname = aNachname;
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