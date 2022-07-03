import BusinessObject from "./BusinessObject";

/**
 * Represents a Zeitintervallbuchung
 */
export default class ZeitintervallbuchungBO extends BusinessObject {
  /**
   * Constructs a CustomerBO object with a given firstname and lastname.
   *
   * @param {String} aZeitdifferenz - the Vorname of this CustomerBO.
   * @param {String} aZeitintervall - the Vorname of this CustomerBO.
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
   * Gets the firstname.
   */
  getBezeichnung() {
    return this.bezeichnung;
  }
  setBezeichnung(aBezeichnung) {
    this.bezeichnung = aBezeichnung;
  }

  /**
   * Gets the firstname.
   */
  getErstelltVon() {
    return this.erstellt_von;
  }
  setErstelltVon(aErstelltVon) {
    this.erstellt_von = aErstelltVon;
  }

  /**
   * Gets the firstname.
   */
  getErstelltFuer() {
    return this.erstellt_für;
  }
  setErstelltFuer(aErstelltFuer) {
    this.erstellt_für = aErstelltFuer;
  }

  /**
   * Gets the firstname.
   */
  getistBuchung() {
    return this.ist_buchung;
  }
  setistBuchung(aIstBuchung) {
    this.ist_buchung = aIstBuchung;
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
