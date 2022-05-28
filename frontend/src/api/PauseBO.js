import ZeitintervallBO from './ZeitintervallBO';

/**
 * Represents a Pause
 */
export default class PauseBO extends ZeitintervallBO {

  constructor() {
    super();
  }

  static fromJSON(pause) {
    let result = [];

    if (Array.isArray(pause)) {
      pause.forEach((n) => {
        Object.setPrototypeOf(n, PauseBO.prototype);
        result.push(n);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let n = pause;
      Object.setPrototypeOf(n, PauseBO.prototype);
      result.push(n);
    }

    return result;
  }
}