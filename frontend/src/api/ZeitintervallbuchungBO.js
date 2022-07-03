import BusinessObject from "./BusinessObject";

/**
 * Represents a Zeitintervallbuchung
 */
export default class ZeitintervallbuchungBO extends BusinessObject {
  /**
   * Constructs a Zeitintervallbuchung object.
   *
   * @param {String} aZeitdifferenz -Attribut of Zeitintervallbuchung.
   * @param {String} aZeitintervall -Attribut of Zeitintervallbuchung.
   */
  constructor(aErstelltVon, aErstelltFuer, aIstBuchung, aBezeichnung, aZeitdifferenz, aZeitintervall) {
    super();
    this.erstellt_von = aErstelltVon;
    this.erstellt_für = aErstelltFuer;
    this.ist_buchung = aIstBuchung;
    this.bezeichnung = aBezeichnung;
    this.zeitdifferenz = aZeitdifferenz;
    this.zeitintervall = aZeitintervall;
  }

  /**
   * Sets a new aZeitdifferenz.
   *
   * @param {String} aZeitdifferenz - the new aZeitdifferenz of this Zeitintervallbuchung.
   */
  setZeitdifferenz(aZeitdifferenz) {
    this.zeitdifferenz = aZeitdifferenz;
  }
  
     getZeitdifferenz() {
      return this.zeitdifferenz;
    }

 
  getBezeichnung() {
    return this.bezeichnung;
  }
  setBezeichnung(aBezeichnung) {
    this.bezeichnung = aBezeichnung;
  }


  getErstelltVon() {
    return this.erstellt_von;
  }
  setErstelltVon(aErstelltVon) {
    this.erstellt_von = aErstelltVon;
  }

  
  getErstelltFuer() {
    return this.erstellt_für;
  }
  setErstelltFuer(aErstelltFuer) {
    this.erstellt_für = aErstelltFuer;
  }


  getistBuchung() {
    return this.ist_buchung;
  }
  setistBuchung(aIstBuchung) {
    this.ist_buchung = aIstBuchung;
  }

  /**
   * Sets a new aZeitintervall.
   *
   * @param {*} aZeitintervall - the new aZeitintervall of this ZeintervallbuchungBO.
   */
  setZeitintervall(aZeitintervall) {
    this.zeitintervall = aZeitintervall;
  }


  getZeitintervall() {
    return this.zeitintervall;
  }

  /**
   * Returns an Array of ZeitintervallbuchungBO from a given JSON structure.
   */
  static fromJSON(zeitintervallbuchung) {
    let result = [];

    if (Array.isArray(zeitintervallbuchung)) {
      zeitintervallbuchung.forEach((z) => {
        Object.setPrototypeOf(z, ZeitintervallbuchungBO.prototype);
        result.push(z);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let z = zeitintervallbuchung;
      Object.setPrototypeOf(z, ZeitintervallbuchungBO.prototype);
      result.push(z);
    }

    return result;
  }
}
