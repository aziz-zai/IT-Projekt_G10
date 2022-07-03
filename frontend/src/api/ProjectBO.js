import BusinessObject from "./BusinessObject";

/**
 * Represents a Project
 */
export default class ProjectBO extends BusinessObject {
  constructor(aProjektname, aLaufzeit, aAuftraggeber, aAvailablehours) {
    super();
    this.projektname = aProjektname;
    this.laufzeit = aLaufzeit;
    this.auftraggeber = aAuftraggeber;
    this.availablehours = aAvailablehours;
  }

  /**
   * Sets a new firstname.
   * @param {String} aProjektname - the new firstname of this CustomerBO.
   */
  setProjektname(aProjektname) {
    this.projektname = aProjektname;
    
  }

  /**
   * Gets the firstname.
   */
  getProjektname() {
    return this.projektname;
  }

  setLaufzeit(aLaufzeit) {
    this.laufzeit = aLaufzeit;
  }

  getLaufzeit() {
    return this.laufzeit;
  }

  setAuftraggeber(aAuftraggeber) {
    this.auftraggeber = aAuftraggeber;
  }

  getAuftraggeber() {
    return this.auftraggeber;
  }

  setAvailablehours(aAvailablehours) {
    this.availablehours = aAvailablehours;
  }

  getAvailablehours() {
    return this.availablehours;
  }

  static fromJSON(projects) {
    let result = [];

    if (Array.isArray(projects)) {
      projects.forEach((p) => {
        Object.setPrototypeOf(p, ProjectBO.prototype);
        result.push(p);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = projects;
      Object.setPrototypeOf(p, ProjectBO.prototype);
      result.push(p);
    }

    return result;
  }
}
