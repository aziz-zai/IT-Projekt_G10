import EreignisBO from "./EreignisBO";

/**
 * Represents a Gehen Ereignis
 */
export default class GehenBO extends EreignisBO {
  constructor(aZeitpunkt, aBezeichnung) {
    super();
    this.zeitpunkt = aZeitpunkt;
    this.bezeichnung = aBezeichnung;
  }

  static fromJSON(gehen) {
    let result = [];

    if (Array.isArray(gehen)) {
      gehen.forEach((g) => {
        Object.setPrototypeOf(g, GehenBO.prototype);
        result.push(g);
      });
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let g = gehen;
      Object.setPrototypeOf(g, GehenBO.prototype);
      result.push(g);
    }

    return result;
  }
}
