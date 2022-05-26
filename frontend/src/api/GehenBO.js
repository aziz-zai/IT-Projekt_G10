import Ereignis from './Ereignis';

/**
 * Represents a Project
 */
export default class GehenBO extends Ereignis {

  constructor() {
    super();
  }

  
  static fromJSON(projects) {
    let result = [];

    if (Array.isArray(gehen)) {
        gehen.forEach((g) => {
        Object.setPrototypeOf(g, GehenBO.prototype);
        result.push(g);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let g = gehen;
      Object.setPrototypeOf(g, GehenBO.prototype);
      result.push(g);
    }

    return result;
  }
}