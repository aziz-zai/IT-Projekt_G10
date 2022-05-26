import EreignisBO from './EreignisBO';

/**
 * Represents a Kommen Ereignis
 */
export default class KommenBO extends EreignisBO {

  constructor() {
    super();
    
  }

  
  
  static fromJSON(kommen) {
    let result = [];

    if (Array.isArray(kommen)) {
      kommen.forEach((k) => {
        Object.setPrototypeOf(k, KommenBO.prototype);
        result.push(k);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let k = kommen;
      Object.setPrototypeOf(k, KommenBO.prototype);
      result.push(k);
    }

    return result;
  }
}