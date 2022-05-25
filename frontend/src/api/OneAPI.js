import UserBO from './UserBO';
import ProjectBO from './ProjectBO';
import MembershipBO from './MembershipBO';
import ProjektarbeitBO from './ProjektarbeitBO';
import ZeitintervallbuchungBO from './ZeitintervallbuchungBO';
import GehenBO from './GehenBO';


/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
export default class OneAPI {

  // Singelton instance
  static #api = null;


  // Local Python backend
  #OneServerBaseURL = 'http://localhost:5000/projectone';

  // User related
  #getUserGidURL = (id) => `${this.#OneServerBaseURL}/users-by-gid/${id}`;
  #getUserURL = (id) => `${this.#OneServerBaseURL}/users/${id}`;

  // Project related
  #getProjectsURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #addProjectsURL = (user) => `${this.#OneServerBaseURL}/projects/${user}`;
  #updateProjectURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #deleteProjectURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;

  //Membership related
  #addMembershipURL = () => `${this.#OneServerBaseURL}/membership/`;
  #getMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;
  #getMembershipByProjectURL = (id) => `${this.#OneServerBaseURL}/membership/projects/${id}`;
  #getMembershipByUserURL = (id) => `${this.#OneServerBaseURL}/membership/projects/user/${id}`;
  #getMembershipByUserAndProjectURL = (id) => `${this.#OneServerBaseURL}/membership/projects/user/project/${id}`;
  #updateMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;
  #deleteMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;

  //Aktivitäten related

  //Arbeitszeitkonto related

  //Projektarbeit related
  #getProjektarbeitURL = (id) => `${this.#OneServerBaseURL}/projektarbeiten/${id}`;
  #addProjektarbeitURL = () => `${this.#OneServerBaseURL}/projektarbeiten/`;
  #updateProjektarbeitURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #deleteProjektarbeitURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;

  //Zeitintervallbuchung related
  #getZeitintervallbuchungURL = (id) => `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;
  #addZeitintervallbuchungURL = () => `${this.#OneServerBaseURL}/zeitintervallbuchung/`;
  #updateZeitintervallbuchungURL = (id) => `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;
  #deleteZeitintervallbuchungURL = (id) => `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;

  //Ereignisbuchung related

  //Ereignis related

  //Kommen related

  //Gehen related
  #getGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;
  #addGehenURL = () => `${this.#OneServerBaseURL}/gehen/`;
  #updateGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;
  #deleteGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;


  //Pause related




  /** 
   * Get the Singelton instance 
   * 
   * @public
   */
  static getAPI() {
    if (this.#api == null) {
      this.#api = new OneAPI();
    }
    return this.#api;
  }
  
  /**
   *  Returns a Promise which resolves to a json object. 
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
   *  fetchAdvanced throws an Error also an server status errors
   */
   #fetchAdvanced = (url,init) => fetch(url,{credentials: 'include', ...init})
   .then(res => {
       if (!res.ok){
           throw Error(`${res.status} ${res.statusText}`);
       }
       return res.json();
   })

 
  /**
   * Returns a Promise, which resolves to an Array of CustomerBOs
   * 
   * @public
   */
  getUserGid(id) {
    return this.#fetchAdvanced(this.#getUserGidURL(id)).then((responseJSON) => {
      let usersBOs = UserBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(usersBOs);
      })
    })
  }

  getUser(id) {
    return this.#fetchAdvanced(this.#getUserURL(id)).then((responseJSON) => {
      let usersBOs = UserBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(usersBOs);
      })
    })
  }

  getProject(id) {
    return this.#fetchAdvanced(this.#getProjectsURL(id)).then((responseJSON) => {
      let projectsBOs = ProjectBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(projectsBOs);
      })
    })
  }

  addProject(projectBO) {
    return this.#fetchAdvanced(this.#addProjectsURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
        })
    })
  }
   /**
     * Updates a customer and returns a Promise, which resolves to a CustomerBO.
     * 
     * @param {ProjectBO} projectBO to be updated
     * @public
     */
  updateProject(projectBO) {
    return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }j

  deleteProject(id) {
    return this.#fetchAdvanced(this.#deleteProjectURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      })
    })
  }

  getMembership(id) {
    return this.#fetchAdvanced(this.#getMembershipURL(id)).then((responseJSON) => {
      let membershipBOs = MembershipBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      })
    })
  }

  getMembershipByProject(project) {
    return this.#fetchAdvanced(this.#getMembershipByProjectURL(project)).then((responseJSON) => {
      let membershipBOs = MembershipBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      })
    })
  }

  getMembershipByUser(user) {
    return this.#fetchAdvanced(this.#getMembershipByUserURL(user)).then((responseJSON) => {
      let membershipBOs = ProjectBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      })
    })
  }

  getMembershipByUserAndProject(user, project) {
    return this.#fetchAdvanced(this.#getMembershipByUserAndProjectURL(user, project)).then((responseJSON) => {
      let membershipBOs = ProjectBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      })
    })
  }

  addMembership(membershipBO) {
    return this.#fetchAdvanced(this.#addMembershipURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(membershipBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseMembershipBO = ProjectBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseMembershipBO);
        })
    })
  }
 /**
     * Updates a membership and returns a Promise, which resolves to a MembershipBO.
     * 
     * @param {MembershipBO} membershipBO to be updated
     * @public
     */
  updateMembership(membershipBO) {
    return this.#fetchAdvanced(this.#updateMembershipURL(membershipBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(membershipBO)
    }).then((responseJSON) => {
      // We always get an array of MembershipBOs.fromJSON
      let responseMembershipBO = MembershipBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseMembershipBO);
      })
    })
  }

  deleteMembership(membershipBO) {
    return this.#fetchAdvanced(this.#deleteMembershipURL(membershipBO), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of MembershipBO.fromJSON
      let responseMembershipBO = MembershipBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseMembershipBO);
      })
    })
  }

  getProjektarbeit(id) {
    return this.#fetchAdvanced(this.#getProjektarbeitURL(id)).then((responseJSON) => {
      let projektarbeitenBOs = ProjektarbeitBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(projectsBOs);
      })
    })
  }

  addProjektarbeit(projektarbeitBO) {
    return this.#fetchAdvanced(this.#addProjektarbeitURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projektarbeitBO)
    }).then((responseJSON) => {
      // We always get an array of ProjektarbeitBO.fromJSON, but only need one object
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
        })
    })
  }
    /**
     * Updates a customer and returns a Promise, which resolves to a CustomerBO.
     * 
     * @param {ProjektarbeitBO} projektarbeitBO to be updated
     * @public
     */
  updateProjektarbeit(projektarbeitBO) {
    return this.#fetchAdvanced(this.#updateProjektarbeitURL(projektarbeitBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projektarbeitBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      })
    })
  }j

  deleteProjektarbeit(id) {
    return this.#fetchAdvanced(this.#deleteProjektarbeitURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      })
    })
  }


  getZeitintervallbuchung(id) {
    return this.#fetchAdvanced(this.#getZeitintervallbuchungURL(id)).then((responseJSON) => {
      let zeitintervallbuchungBOs = ZeitintervallbuchungBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(zeitintervallbuchungBOs);
      })
    })
  }

  addZeitintervallbuchung(zeitintervallbuchungBO) {
    return this.#fetchAdvanced(this.#addZeitintervallbuchungURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(zeitintervallbuchungBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseZeitintervallbuchungBO = ZeitintervallbuchungBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseZeitintervallbuchungBO);
        })
    })
  }
   /**
     * Updates a customer and returns a Promise, which resolves to a CustomerBO.
     * 
     * @param {ProjectBO} projectBO to be updated
     * @public
     */
  updateZeitintervallbuchung(zeitintervallbuchungBO) {
    return this.#fetchAdvanced(this.#updateZeitintervallbuchungURL(zeitinterballbuchungBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(zeitintervallbuchungBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseZeitintervallbuchungBO = ZeitintervallbuchungBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseZeitintervallbuchungBO);
      })
    })
  }j

  deleteZeitintervallbuchung(id) {
    return this.#fetchAdvanced(this.#deleteZeitintervallbuchungURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseZeitintervallbuchungBO = ZeitintervallbuchungBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseZeitintervallbuchungBO);
      })
    })
  }


  getGehen(id) {
    return this.#fetchAdvanced(this.#getGehenURL(id)).then((responseJSON) => {
      let gehenBOs = GehenBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(gehenBOs);
      })
    })
  }

  addGehen(gehenBO) {
    return this.#fetchAdvanced(this.#addGehenURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(gehenBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
        })
    })
  }
   /**
     * Updates a customer and returns a Promise, which resolves to a CustomerBO.
     * 
     * @param {GehenBO} gehenBO to be updated
     * @public
     */
  updateGehen(gehenBO) {
    return this.#fetchAdvanced(this.#updateGehenURL(gehenBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(gehenBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      })
    })
  }j

  deleteGehen(id) {
    return this.#fetchAdvanced(this.#deleteGehenURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      })
    })
  }








}
