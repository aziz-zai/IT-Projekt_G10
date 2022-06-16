import BusinessObject from "./BusinessObject";

/**
 * Represents a Activity
 */

export default class AktivitätenBO extends BusinessObject {

  constructor(aBezeichnung, aDauer, aCapacity, aProject) {
    super();
    this.bezeichnung = aBezeichnung;
    this.dauer = aDauer;
    this.capacity = aCapacity;
    this.project = aProject
  }

  /**
   * Sets a new firstname.
   * 
   * @param {String} aBezeichnung - the new firstname of this CustomerBO.
   */
  setBezeichnung(aBezeichnung) {
    this.bezeichnung = aBezeichnung;
  }

  getBezeichnung() {
    return this.bezeichnung;
  }

  setDauer(aDauer) {
    this.dauer = aDauer;
  }

  getDauer() {
    return this.dauer;
  }

  setCapacity(aCapacity) {
    this.capacity = aCapacity;
  }

  getCapacity() {
    return this.capacity;
  }

  setProject(aProject) {
    this.project = aProject;
  }

  getProject() {
    return this.project;
  }

  static fromJSON(aktivitäten) {
    let result = [];

    if (Array.isArray(aktivitäten)) {
      aktivitäten.forEach((ak) => {
        Object.setPrototypeOf(ak, AktivitätenBO.prototype);
        result.push(ak);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let ak = aktivitäten;
      Object.setPrototypeOf(ak, AktivitätenBO.prototype);
      result.push(ak);
    }

    return result;
  }
}