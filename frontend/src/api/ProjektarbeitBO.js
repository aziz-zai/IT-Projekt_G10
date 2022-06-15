import ZeitintervallBO from './ZeitintervallBO';

/**
 * Represents a Project
 */
export default class ProjektarbeitBO extends ZeitintervallBO {

  constructor(aBeschreibung, aActivity) {
    super();
    this.beschreibung = aBeschreibung;
    this.activity = aActivity;
  }

  setBeschreibung(aBeschreibung) {
    this.beschreibung = aBeschreibung;
  }

  getBeschreibung() {
    return this.beschreibung;
  }

  setActivity(aActivity) {
    this.activity = aActivity;
  }

  getActivity() {
    return this.activity;
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