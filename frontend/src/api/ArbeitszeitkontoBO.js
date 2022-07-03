import BusinessObject from "./BusinessObject";

/**
 * Represents a Arbeitszeitkonto
 */
export default class ArbeitszeitkontoBO extends BusinessObject {
  constructor(aUrlaubskonto, aUser, aArbeitsleistung, aGleitzeit) {
    super();
    this.urlaubskonto = aUrlaubskonto;
    this.user = aUser;
    this.arbeitsleistung = aArbeitsleistung;
    this.gleitzeit = aGleitzeit;
  }

  /**
   * Sets a new aUrlaubskonto.
   *
   * @param {Float} aUrlaubskonto - the new aUrlaubskonto of this ArbeitszeitkontoBO.
   */
  setUrlaubskonto(aUrlaubskonto) {
    this.urlaubskonto = aUrlaubskonto;
  }

  /**
   * Gets the aUrlaubskonto.
   */
  getUrlaubskonto() {
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

  setGleitzeit(aGleitzeit) {
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
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let m = arbeitszeitkonto;
      Object.setPrototypeOf(m, ArbeitszeitkontoBO.prototype);
      result.push(m);
    }

    return result;
  }
}
