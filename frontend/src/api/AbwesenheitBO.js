import ZeitintervallBO from './ZeitintervallBO'

/**
 * Represents a Abwesenheit
 */

export default class AbwesenheitBO extends ZeitintervallBO {

  constructor(aAbwesenheitsart) {
    super();
    this.abwesenheitsart = aAbwesenheitsart
  }

  /**
   * Sets a new firstname.
   * 
   * @param {String} aAbwesenheitsart - the new firstname of this CustomerBO.
   */
  setAbwesenheitsart(aAbwesenheitsart) {
    this.abwesenheitsart = aAbwesenheitsart;
  }

  getAbwesenheitsart() {
    return this.abwesenheitsart;
  }

  static fromJSON(abwesenheit) {
    let result = [];

    if (Array.isArray(abwesenheit)) {
      abwesenheit.forEach((a) => {
        Object.setPrototypeOf(a, AbwesenheitBO.prototype);
        result.push(a);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = abwesenheit;
      Object.setPrototypeOf(a, AbwesenheitBO.prototype);
      result.push(a);
    }

    return result;
  }
}