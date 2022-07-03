import BusinessObject from "./BusinessObject";

/**
 * Represents a Membership
 */
export default class MembershipBO extends BusinessObject {
  constructor(aUser, aProject, aProjektleiter) {
    super();
    this.user = aUser;
    this.project = aProject;
    this.projektleiter = aProjektleiter;
  }

  /**
   * @param {String} aUser - the new user of this MembershipBO.
   */
  setUser(aUser) {
    this.user = aUser;
  }

  getUser() {
    return this.user;
  }

  setProject(aProject) {
    this.project = aProject;
  }

  getProject() {
    return this.project;
  }

  setProjektleiter(aProjektleiter) {
    this.projektleiter = aProjektleiter;
  }

  getProjektleiter() {
    return this.projektleiter;
  }

  static fromJSON(membership) {
    let result = [];

    if (Array.isArray(membership)) {
      membership.forEach((m) => {
        Object.setPrototypeOf(m, MembershipBO.prototype);
        result.push(m);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let m = membership;
      Object.setPrototypeOf(m, MembershipBO.prototype);
      result.push(m);
    }

    return result;
  }
}
