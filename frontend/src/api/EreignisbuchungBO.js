import BusinessObject from "./BusinessObject";


/**
 * Represents a Ereignisbuchung
 */
export default class EreignisbuchungBO extends BusinessObject {

  constructor(aErstellt_von, aErstellt_für, aIst_buchung, aEreignis) {
    super();
    this.erstellt_von = aErstellt_von;
    this.erstellt_für = aErstellt_für;
    this.ist_buchung = aIst_buchung;
    this.ereignis = aEreignis;
  }

  /**
   * Sets a new Ereignisbuchung.
   * 
   * @param {Integer} aErstellt_von - the new erstellt_von of this EreignisbuchungBO.
   * @param {Integer} aErstellt_für
   * @param {Boolean} aIst_buchung
   * @param {Integer} aEreignis
   * 
   */

  setErstellt_von(aErstellt_von) {
    this.erstellt_von = aErstellt_von;
  }

 
  getErstellt_von() {
    return this.erstellt_von;
  }

  setErstellt_für(aErstellt_für) {
    this.erstellt_für = aErstellt_für;
  }

  getErstellt_für() {
    return this.erstellt_für;
  }

  setIst_buchung(aIst_buchung) {
    this.ist_buchung = aIst_buchung;
  }

 
  getIst_buchung() {
    return this.ist_buchung;
  }

  setEreignis(aEreignis) {
    this.ereignis = aEreignis;
  }

  getEreignis() {
    return this.ereignis;
  }
  
  static fromJSON(ereignisbuchung) {
    let result = [];

    if (Array.isArray(ereignisbuchung)) {
      ereignisbuchung.forEach((er) => {
        Object.setPrototypeOf(er, EreignisbuchungBO.prototype);
        result.push(er);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let er = ereignisbuchung;
      Object.setPrototypeOf(er, EreignisbuchungBO.prototype);
      result.push(er);
    }

    return result;
  }
}