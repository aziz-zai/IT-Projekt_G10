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
   * Sets a new Projektname.
   * @param {String} aProjektname - the new projektname of the ProjektBO
   */
  setProjektname(aProjektname) {
    this.projektname = aProjektname;
    
  }

  /**
   * Gets the projektname.
   */
  getProjektname() {
    return this.projektname;
  }

    /**
   * Laufzeit Getter und Setter.
   */
  setLaufzeit(aLaufzeit) {
    this.laufzeit = aLaufzeit;
  }

  getLaufzeit() {
    return this.laufzeit;
  }
  /**
   * Auftraggeber Getter und Setter.
   */
  setAuftraggeber(aAuftraggeber) {
    this.auftraggeber = aAuftraggeber;
  }

  getAuftraggeber() {
    return this.auftraggeber;
  }
   /**
   * Availablehours Getter und Setter.
   */
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
