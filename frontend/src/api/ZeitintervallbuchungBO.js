import BusinessObject from './BusinessObject';

/**
 * Represents a customer of the bank.
 */
export default class ZeitintervallbuchungBO extends BusinessObject {

  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   * 
   * @param {String} aZeitdifferenz - the Vorname of this CustomerBO.
   * @param {String} aZeitintervall - the Vorname of this CustomerBO.
   */
  constructor(aZeitdifferenz, aZeitintervall) {
    super();
    this.zeitdifferenz = aZeitdifferenz;
    this.zeitintervall = aZeitintervall;
  }

  /**
   * Sets a new firstname.
   * 
   * @param {String} aZeitdifferenz - the new firstname of this CustomerBO.
   */
  setZeitdifferenz(aZeitdifferenz) {
    this.zeitdifferenz = aZeitdifferenz;
  }

  /**
   * Gets the firstname.
   */
  getZeitdifferenz() {
    return this.zeitdifferenz;
  }

  /**
   * Sets a new lastname.
   * 
   * @param {*} aZeitintervall - the new lastname of this CustomerBO.
   */
  setZeitintervall(aZeitintervall) {
    this.zeitintervall = aZeitintervall;
  }

  /**
   * Gets the Nachname.
   */
  getZeitintervall() {
    return this.zeitintervall;
  }

  /** 
   * Returns an Array of CustomerBOs from a given JSON structure.
   */
  static fromJSON(zeitintervallbuchung) {
    let result = [];

    if (Array.isArray(zeitintervallbuchung)) {
        zeitintervallbuchung.forEach((z) => {
        Object.setPrototypeOf(z, ZeitintervallbuchungBO.prototype);
        result.push(z);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let z = zeitintervallbuchung;
      Object.setPrototypeOf(z, ZeitintervallbuchungBO.prototype);
      result.push(z);
    }

    return result;
  }
}