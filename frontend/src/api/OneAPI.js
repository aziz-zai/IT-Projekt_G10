import UserBO from './UserBO';
import ProjectBO from './ProjectBO';
import MembershipBO from './MembershipBO';
import EreignisBO from './EreignisBO';
import KommenBO from './KommenBO';
import EreignisbuchungBO from './EreignisbuchungBO';



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
  #OneServerBaseURL = 'http://127.0.0.1:5000/projectone';

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

  //Zeitintervallbuchung related

  //Ereignisbuchung related
  #addEreignisbuchungURL = () => `${this.#OneServerBaseURL}/ereignisbuchung/`;
  #getEreignisbuchungURL = (id) => `${this.#OneServerBaseURL}/ereignisbuchung/${id}`;
  #updateEreignisbuchungURL = (id) => `${this.#OneServerBaseURL}/ereignisbuchung/${id}`;
  #deleteEreignisbuchungURL = (id) => `${this.#OneServerBaseURL}/ereignisbuchung/${id}`;


  //Ereignis related
  #addEreignisURL = () => `${this.#OneServerBaseURL}/ereignis/`;
  #getEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  #updateEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  #deleteEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  


  //Kommen related
  #addKommenURL = () => `${this.#OneServerBaseURL}/kommen/`;
  #getKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;
  #updateKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;
  #deleteKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;


  //Gehen related

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
  #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    }
    )

 
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



  addEreignis(ereignisBO) {
    return this.#fetchAdvanced(this.#addEreignisURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ereignisBO)
    }).then((responseJSON) => {
      // We always get an array of EreignisBOs.fromJSON, but only need one object
      let responseEreignisBO = EreignisBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseEreignisBO);
        })
    })
  }


  getEreignis(id) {
    return this.#fetchAdvanced(this.#getEreignisURL(id)).then((responseJSON) => {
      let ereignisBOs = EreignisBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(ereignisBOs);
      })
    })
  }


  updateEreignis(ereignisBO) {
    return this.#fetchAdvanced(this.#updateEreignisURL(ereignisBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ereignisBO)
    }).then((responseJSON) => {
      // We always get an array of EreignisBOs.fromJSON
      let responseEreignisBO = EreignisBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseEreignisBO);
      })
    })
  }

  deleteEreignis(id) {
    return this.#fetchAdvanced(this.#deleteEreignisURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of EreignisBOs.fromJSON
      let responseEreignisBO = EreignisBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseEreignisBO);
      })
    })
  }



  addKommen(kommenBO) {
    return this.#fetchAdvanced(this.#addKommenURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(kommenBO)
    }).then((responseJSON) => {
      // We always get an array of EreignisBOs.fromJSON, but only need one object
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
        })
    })
  }


  getKommen(id) {
    return this.#fetchAdvanced(this.#getKommenURL(id)).then((responseJSON) => {
      let kommenBOs = KommenBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(kommenBOs);
      })
    })
  }


  updateKommen(kommenBO) {
    return this.#fetchAdvanced(this.#updateKommenURL(kommenBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(kommenBO)
    }).then((responseJSON) => {
      // We always get an array of EreignisBOs.fromJSON
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      })
    })
  }

  deleteKommen(id) {
    return this.#fetchAdvanced(this.#deleteKommenURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of EreignisBOs.fromJSON
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      })
    })
  }


  addEreignisbuchung(ereignisbuchungBO) {
    return this.#fetchAdvanced(this.#addEreignisbuchungURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ereignisbuchungBO)
    }).then((responseJSON) => {
      // We always get an array of EreignisbuchungBOs.fromJSON, but only need one object
      let responseEreignisbuchungBO = EreignisbuchungBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseEreignisbuchungBO);
        })
    })
  }


  getEreignisbuchung(id) {
    return this.#fetchAdvanced(this.#getEreignisbuchungURL(id)).then((responseJSON) => {
      let ereignisbuchungBOs = EreignisbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(ereignisbuchungBOs);
      })
    })
  }


  updateEreignisbuchung(ereignisbuchungBO) {
    return this.#fetchAdvanced(this.#updateEreignisbuchungURL(ereignisbuchungBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(ereignisbuchungBO)
    }).then((responseJSON) => {
      // We always get an array of EreignisbuchungBOs.fromJSON
      let responseEreignisbuchungBO = EreignisbuchungBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseEreignisbuchungBO);
      })
    })
  }

  deleteEreignisbuchung(id) {
    return this.#fetchAdvanced(this.#deleteEreignisbuchungURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of EreignisbuchungBOs.fromJSON
      let responseEreignisbuchungBO = EreignisbuchungBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseEreignisbuchungBO);
      })
    })
  }




}
