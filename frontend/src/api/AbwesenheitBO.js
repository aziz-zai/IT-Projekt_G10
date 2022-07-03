import ZeitintervallBO from "./ZeitintervallBO";

/*
 * Implementieren des Abwesenheit BusinessObject für das Frontend.
 * Einfache Methoden zum setzen der Klassenvariablen, wie im Backend..
 */
export default class AbwesenheitBO extends ZeitintervallBO {
  constructor(aStart, aEnde, aBezeichnung, aAbwesenheitsart) {
    super();
    this.start = aStart;
    this.ende = aEnde;
    this.bezeichnung = aBezeichnung;
    this.abwesenheitsart = aAbwesenheitsart;
    
  }

  setAbwesenheitsart(aAbwesenheitsart) {
    this.abwesenheitsart = aAbwesenheitsart;
  }

  getAbwesenheitsart() {
    return this.abwesenheitsart;
  }

  // Gibt ein Array aus AbwesenheitBOs von einer gegebenen JSON Struktur zurück
  static fromJSON(abwesenheit) {
    let result = [];

    if (Array.isArray(abwesenheit)) {
      abwesenheit.forEach((a) => {
        Object.setPrototypeOf(a, AbwesenheitBO.prototype);
        result.push(a);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let a = abwesenheit;
      Object.setPrototypeOf(a, AbwesenheitBO.prototype);
      result.push(a);
    }

    return result;
  }
}
