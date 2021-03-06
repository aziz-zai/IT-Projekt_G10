import BusinessObject from "./BusinessObject";

/**
 * Represents a Zeitintervall
 */

export default class ZeitintervallBO extends BusinessObject {
  constructor(aStart, aEnde, aBezeichnung) {
    super();
    this.start = aStart;
    this.ende = aEnde;
    this.bezeichnung = aBezeichnung;
  }

  /**
   * Sets a new Start.
   *
   * @param {String} aStart - the new Start of this Zeitintervall.
   */

  setBezeichnung(aBezeichnung) {
    this.bezeichnung = aBezeichnung;
  }

  getBezeichnung() {
    return this.bezeichnung;
  }

  setStart(aStart) {
    this.start = aStart;
  }

  getStart() {
    return this.start;
  }

  setEnde(aEnde) {
    this.ende = aEnde;
  }

  getEnde() {
    return this.ende;
  }

  static fromJSON(zeitintervall) {
    let result = [];

    if (Array.isArray(zeitintervall)) {
      zeitintervall.forEach((z) => {
        Object.setPrototypeOf(z, ZeitintervallBO.prototype);
        result.push(z);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let z = zeitintervall;
      Object.setPrototypeOf(z, ZeitintervallBO.prototype);
      result.push(z);
    }

    return result;
  }
}
