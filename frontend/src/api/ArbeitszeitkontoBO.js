import BusinessObject from './BusinessObject';

/**
 * Represents a Project
 */
export default class ArbeitszeitkontoBO extends BusinessObject {

  constructor(aUrlaubskonto, aUser, aArbeitsleistung, aGleitzeit) {
    super();
    this.urlaubskonto = aUrlaubskonto;
    this.user = aUser;
    this.arbeitsleistung = aArbeitsleistung;
    this.gleitzeit = aGleitzeit
  }

  /**
   * Sets a new firstname.
   * 
   * @param {Float} aUrlaubskonto - the new firstname of this ArbeitszeitkontoBO.
   */
  setUrlaubskonto(aUrlaubskonto) {
    this.urlaubskonto = aUrlaubskonto;
  }

  /**
   * Gets the firstname.
   */
  getUrlaubskonto () {
    return this.urlaubskonto;
  }

  setUser(aUser) {
    this.user = aUser;
  }

  getUser() {
    return this.user;
  }

  setArbeitsleistung(aArbeitsleistung) {
    this.arbeitsleistung = aArbeitsleistung;
  }

  getArbeitsleistung() {
    return this.arbeitsleistung;
  }
 
  setGleitzeit(aGleitszeit) {
    this.gleitzeit = aGleitzeit;
  }

  getGleitzeit() {
    return this.gleitzeit;
  }

  static fromJSON(arbeitszeitkonto) {
    let result = [];

    if (Array.isArray(arbeitszeitkonto)) {
        arbeitszeitkonto.forEach((m) => {
        Object.setPrototypeOf(m, ArbeitszeitkontoBO.prototype);
        result.push(m);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = arbeitszeitkonto;
      Object.setPrototypeOf(m, ArbeitszeitkontoBO.prototype);
      result.push(m);
    }

    return result;
  }
}