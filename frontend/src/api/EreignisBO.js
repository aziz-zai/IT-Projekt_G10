import BusinessObject from './BusinessObject';

/**
 * Represents a Ereignis
 */
export default class EreignisBO extends BusinessObject {

  constructor(aZeitpunkt, aBezeichnung) {
    super();
    this.zeitpunkt = aZeitpunkt;
    this.bezeichnung = aBezeichnung;
  }

  /**
   * Sets a new Zeitpunkt.
   * 
   * @param {Datetime} aZeitpunkt - the new zeitpunkt of this EreignisBO.
   */
  setZeitpunkt(aZeitpunkt) {
    this.zeitpunkt = aZeitpunkt;
  }

 
  getZeitpunkt() {
    return this.zeitpunkt;
  }

  setBezeichnung(aBezeichnung) {
    this.bezeichnung = aBezeichnung;
  }

  getBezeichnung() {
    return this.bezeichnung;
  }

  
  static fromJSON(ereignis) {
    let result = [];

    if (Array.isArray(ereignis)) {
      ereignis.forEach((e) => {
        Object.setPrototypeOf(e, EreignisBO.prototype);
        result.push(e);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let e = ereignis;
      Object.setPrototypeOf(e, EreignisBO.prototype);
      result.push(e);
    }

    return result;
  }
}