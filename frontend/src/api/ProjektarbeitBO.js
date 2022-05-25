import BusinessObject from './BusinessObject';

/**
 * Represents a Project
 */
export default class ProjektarbeitBO extends BusinessObject {

  constructor(aBezeichnung, aActivity) {
    super();
    this.bezeichnung = aBezeichnung;
    this.activity = aActivity;
  }

  /**
   * Sets a new firstname.
   * 
   * @param {String} aBezeichnung - the new firstname of this CustomerBO.
   */
  setBezeichnung(aBezeichnung) {
    this.bezeichnung = aBezeichnung;
  }

  /**
   * Gets the firstname.
   */
  getBezeichnung() {
    return this.bezeichnung;
  }

  setLaufzeit(aActivity) {
    this.activity = aActivity;
  }

  static fromJSON(projektarbeiten) {
    let result = [];

    if (Array.isArray(projektarbeiten)) {
      projektarbeiten.forEach((p) => {
        Object.setPrototypeOf(p, ProjektarbeitBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = projektarbeiten;
      Object.setPrototypeOf(p, ProjektarbeitBO.prototype);
      result.push(p);
    }

    return result;
  }
}