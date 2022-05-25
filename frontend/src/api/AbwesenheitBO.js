import BusinessObject from './BusinessObject';

/**
 * Represents a Project
 */
export default class AbwesenheitBO extends BusinessObject {

  constructor(aZeitintervallID, aBemerkung, aAbwesenheitsart) {
    super();
    this.zeitintervallID = aZeitintervallID;
    this.bemerkung = aBemerkung;
    this.abwesenheitsart = aAbwesenheitsart
  }

  /**
   * Sets a new firstname.
   * 
   * @param {String} aZeitintervallID - the new firstname of this CustomerBO.
   */
  setZeitintervallID(aZeitintervallID) {
    this.zeitintervallID = aZeitintervallID;
  }

  /**
   * Gets the firstname.
   */
  getZeitintervallID() {
    return this.zeitintervallID;
  }

  setBemerkung(aBemerkung) {
    this.bemerkung = aBemerkung;
  }

  getBemerkung() {
    return this.bemerkung;
  }

  setAbwesenheitsart(aAbwesenheitsart) {
    this.abwesenheitsart = aAbwesenheitsart;
  }

  getAbwesenheitsart() {
    return this.abwesenheitsart;
  }

  static fromJSON(abwesenheit) {
    let result = [];

    if (Array.isArray(abwesenheit)) {
      projects.forEach((a) => {
        Object.setPrototypeOf(a, AbwesenheitBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = abwesenheit;
      Object.setPrototypeOf(a, AbwesenheitBO.prototype);
      result.push(a);
    }

    return result;
  }
}