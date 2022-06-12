import UserBO from './UserBO';
import ProjectBO from './ProjectBO';
import MembershipBO from './MembershipBO';
import ProjektarbeitBO from './ProjektarbeitBO';
import ZeitintervallbuchungBO from './ZeitintervallbuchungBO';
import GehenBO from './GehenBO';
import EreignisBO from './EreignisBO';
import KommenBO from './KommenBO';
import EreignisbuchungBO from './EreignisbuchungBO';
import AbwesenheitBO from './AbwesenheitBO';
import AktivitätenBO from './AktivitätenBO';
import PauseBO from './PauseBO';
import ArbeitszeitkontoBO from './ArbeitszeitkontoBO'



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
  #updateUserURL = (id) => `${this.#OneServerBaseURL}/users/${id}`;

  // Project related
  #getProjectsURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #addProjectsURL = (user) => `${this.#OneServerBaseURL}/projects/${user}`;
  #updateProjectURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #deleteProjectURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;

  //Membership related
  #addMembershipURL = () => `${this.#OneServerBaseURL}/membership/`;
  #getMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;
  #getMembersByProjectURL = (project) => `${this.#OneServerBaseURL}/members-by-project/${project}`;
  #getProjektleiterByProjectURL = (project) => `${this.#OneServerBaseURL}/projektleiter-by-project/${project}`;
  #getMembershipByUserURL = (id) => `${this.#OneServerBaseURL}/membership-by-user/${id}`;
  #getMembershipByUserAndProjectURL = (id) => `${this.#OneServerBaseURL}/membership-by-user-and-project/${id}`;
  #updateMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;
  #deleteMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;

  //Abwesenheit related
  #getAbwesenheitURL = (id) => `${this.#OneServerBaseURL}/abwesenheit/${id}`;
  #addAbwesenheitURL = () => `${this.#OneServerBaseURL}/abwesenheit/`;
  #updateAbwesenheitURL = (id) => `${this.#OneServerBaseURL}/abwesenheit/${id}`;
  #deleteAbwesenheitURL = (id) => `${this.#OneServerBaseURL}/abwesenheit/${id}`;

  //Aktivitäten related
  #getAktivitätenByIdURL = (id) => `${this.#OneServerBaseURL}/aktivitaeten/${id}`;
  #getAktivitätenByProjectIdURL = (project_id) => `${this.#OneServerBaseURL}/aktivitaeten-by-project/${project_id}`;
  #addAktivitätenURL = () => `${this.#OneServerBaseURL}/aktivitaeten`;
  #updateAktivitätenURL = (id) => `${this.#OneServerBaseURL}/aktivitaeten/${id}`;
  #deleteAktivitätenURL = (id) => `${this.#OneServerBaseURL}/aktivitaeten/${id}`;


  //Arbeitszeitkonto related

  //Projektarbeit related
  #getProjektarbeitURL = (id) => `${this.#OneServerBaseURL}/projektarbeiten/${id}`;
  #getProjektarbeitByActivityURL = (activity) => `${this.#OneServerBaseURL}/projektarbeiten-activity/${activity}`;
  #getProjektarbeitByStartURL = (start) => `${this.#OneServerBaseURL}/projektarbeit-by-start/${start}`;
  #addProjektarbeitURL = () => `${this.#OneServerBaseURL}/projektarbeiten/`;
  #updateProjektarbeitURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #deleteProjektarbeitURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;

  //Zeitintervallbuchung related
  #getZeitintervallbuchungURL = (id) => `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;
  #addZeitintervallbuchungURL = () => `${this.#OneServerBaseURL}/zeitintervallbuchung/`;
  #updateZeitintervallbuchungURL = (id) => `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;
  #deleteZeitintervallbuchungURL = (id) => `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;

  //Ereignisbuchung related
  #addEreignisbuchungURL = () => `${this.#OneServerBaseURL}/ereignisbuchung`;
  #getEreignisbuchungURL = (id) => `${this.#OneServerBaseURL}/ereignisbuchung/${id}`;
  #updateEreignisbuchungURL = (id) => `${this.#OneServerBaseURL}/ereignisbuchung/${id}`;
  #deleteEreignisbuchungURL = (id) => `${this.#OneServerBaseURL}/ereignisbuchung/${id}`;


  //Ereignis related
  #addEreignisURL = () => `${this.#OneServerBaseURL}/ereignis`;
  #getEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  #updateEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  #deleteEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  


  //Kommen related
  #addKommenIstURL = (user, projektarbeit) => `${this.#OneServerBaseURL}/kommen-ist/${user}/${projektarbeit}`;
  #getKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;
  #updateKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;
  #deleteKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;


  //Gehen related
  #getGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;
  #addGehenIstURL = (projektarbeit, user, aktivität) => `${this.#OneServerBaseURL}/gehen-ist/${projektarbeit}/${user}/${aktivität}`;
  #updateGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;
  #deleteGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;


  //Pause related
  #addPausenBeginnURL = (user) => `${this.#OneServerBaseURL}/pausenBeginn/${user}`;
  #addPausenEndeURL = (pausenBeginn, user) => `${this.#OneServerBaseURL}/pausenEnde/${pausenBeginn}/${user}`;
  #getPauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;
  #updatePauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;
  #deletePauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;

  //Arbeitszeitkonto related
  #getArbeitszeitkontoURL	 = (id) => `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${id}`;
  #updateArbeitszeitkontoURL = (id) => `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${id}`;
  #deleteArbeitszeitkontoURL = (id) => `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${id}`;
  



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
  updateUser(UserBO) {
    return this.#fetchAdvanced(this.#updateUserURL(UserBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(UserBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseUserBO = UserBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseUserBO);
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

  addProject(projectBO, user) {
    return this.#fetchAdvanced(this.#addProjectsURL(user), {
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
  }

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

  getMembersByProject(project) {
    return this.#fetchAdvanced(this.#getMembersByProjectURL(project)).then((responseJSON) => {
      let membershipBOs = UserBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      })
    })
  }

  getProjektleiterByProject(project) {
    return this.#fetchAdvanced(this.#getProjektleiterByProjectURL(project)).then((responseJSON) => {
      let membershipBOs = UserBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      })
    })
  }

  getMembershipByUser(user) {
    return this.#fetchAdvanced(this.#getMembershipByUserURL(user)).then((responseJSON) => {
      let projectBOs = ProjectBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(projectBOs);
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


  getAbwesenheit(id) {
      return this.#fetchAdvanced(this.#getAbwesenheitURL(id)).then((responseJSON) => {
        let abwesenheitBOs = AktivitätenBO.fromJSON(responseJSON);
        // console.info(customerBOs);
        return new Promise(function (resolve) {
          resolve(abwesenheitBOs);
        })
      })
    }

  addAbwesenheit(abwesenheitBO) {
    return this.#fetchAdvanced(this.#addAbwesenheitURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },body: JSON.stringify(abwesenheitBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseAbwesenheitBO = AbwesenheitBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseAbwesenheitBO);
        })
    })
  }
  getProjektarbeit(id) {
    return this.#fetchAdvanced(this.#getProjektarbeitURL(id)).then((responseJSON) => {
      let projektarbeitenBOs = ProjektarbeitBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(projektarbeitenBOs);
      })
    })
  }

  getProjektarbeitByActivity(activity) {
    return this.#fetchAdvanced(this.#getProjektarbeitByActivityURL(activity)).then((responseJSON) => {
      let projektarbeitenBOs = ProjektarbeitBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(projektarbeitenBOs);
      })
    })
  }

  getProjektarbeitByStart(start) {
    return this.#fetchAdvanced(this.#getProjektarbeitByStartURL(start)).then((responseJSON) => {
      let projektarbeitenBOs = ProjektarbeitBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(projektarbeitenBOs);
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
  }

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
    return this.#fetchAdvanced(this.#updateZeitintervallbuchungURL(zeitintervallbuchungBO.getID()), {
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
  }

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

  getGehen(id) {
    return this.#fetchAdvanced(this.#getGehenURL(id)).then((responseJSON) => {
      let gehenBOs = GehenBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(gehenBOs);
      })
    })
  }


  addGehenIst(projektarbeit, user, aktivität) {
    return this.#fetchAdvanced(this.#addGehenIstURL(projektarbeit, user, aktivität), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
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
  }

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


  addKommenIst(user, projektarbeit) {
    return this.#fetchAdvanced(this.#addKommenIstURL(user, projektarbeit), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      
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

   /**
     * Updates a customer and returns a Promise, which resolves to a CustomerBO.
     * 
     * @param {AbwesenheitBO} abwesenheitBO to be updated
     * @public
     */


  updateAbwesenheit(abwesenheitBO) {
    return this.#fetchAdvanced(this.#updateAbwesenheitURL(abwesenheitBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(abwesenheitBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseAbwesenheitBO = AbwesenheitBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseAbwesenheitBO);
      })
    })
  }

  deleteAbwesenheit(id) {
    return this.#fetchAdvanced(this.#deleteAbwesenheitURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseAbwesenheitBO = AbwesenheitBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseAbwesenheitBO);
      })
    })
  }

  getAktivitätenById(id) {
    return this.#fetchAdvanced(this.#getAktivitätenByIdURL(id)).then((responseJSON) => {
      let aktivitätenBOs = AktivitätenBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(aktivitätenBOs);
      })
    })
  }

  getAktivitätenByProjectId(project_id) {
    return this.#fetchAdvanced(this.#getAktivitätenByProjectIdURL(project_id)).then((responseJSON) => {
      let aktivitätenBOs = AktivitätenBO.fromJSON(responseJSON);
      // console.info(customerBOs);
      return new Promise(function (resolve) {
        resolve(aktivitätenBOs);
      })
    })
  }

  addAktivitäten(aktivitätenBO) {
    return this.#fetchAdvanced(this.#addAktivitätenURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(aktivitätenBO)
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseAktivitätenBO = AktivitätenBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseAktivitätenBO);
        })
    })
  }

   /**
     * Updates a customer and returns a Promise, which resolves to a CustomerBO.
     * 
     * @param {AktivitätenBO} aktivitätenBO to be updated
     * @public
     */

  updateAktivitäten(id) {
    return this.#fetchAdvanced(this.#updateAktivitätenURL(id), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(id)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseAktivitätenBO = AktivitätenBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseAktivitätenBO);
      })
    })
  }

  deleteAktivitäten(id) {
    return this.#fetchAdvanced(this.#deleteAktivitätenURL(id), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responseAktivitätenBO = AktivitätenBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseAktivitätenBO);
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


getArbeitszeitkonto(user) {
  return this.#fetchAdvanced(this.#getArbeitszeitkontoURL(user)).then((responseJSON) => {
    let arbeitszeitkontoBOs = ArbeitszeitkontoBO.fromJSON(responseJSON);
    // console.info(customerBOs);
    return new Promise(function (resolve) {
      resolve(arbeitszeitkontoBOs);
    })
  })
}

updateArbeitszeitkonto(arbeitszeitkontoBO) {
  return this.#fetchAdvanced(this.#updateArbeitszeitkontoURL(arbeitszeitkontoBO.getID()), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(arbeitszeitkontoBO)
  }).then((responseJSON) => {
    // We always get an array of ArbeitszeitkontoBOs.fromJSON
    let responseArbeitszeitkontoBO = arbeitszeitkontoBO.fromJSON(responseJSON)[0];
    // 
    return new Promise(function (resolve) {
      resolve(responseArbeitszeitkontoBO);
    })
  })
}

deleteArbeitszeitkonto(arbeitszeitkontoBO) {
  return this.#fetchAdvanced(this.#deleteArbeitszeitkontoURL(arbeitszeitkontoBO), {
    method: 'DELETE'
  }).then((responseJSON) => {
    // We always get an array of ArbeitszeitkontoBO.fromJSON
    let responseArbeitszeitkontoBO = arbeitszeitkontoBO.fromJSON(responseJSON)[0];
    //
    return new Promise(function (resolve) {
      resolve(responseArbeitszeitkontoBO);
    })
  })
}


addPausenBeginn(pauseBO, user) {
  return this.#fetchAdvanced(this.#addPausenBeginnURL(user), {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(pauseBO)
  }).then((responseJSON) => {
    // We always get an array of ArbeitszeitkontoBOs.fromJSON, but only need one object
    let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
    // 
    return new Promise(function (resolve) {
      resolve(responsePauseBO);
      })
  })
}

addPausenEnde(pauseBO, pausenBeginn, user) {
  return this.#fetchAdvanced(this.#addPausenEndeURL(pausenBeginn, user), {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(pauseBO)
  }).then((responseJSON) => {
    // We always get an array of ArbeitszeitkontoBOs.fromJSON, but only need one object
    let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
    // 
    return new Promise(function (resolve) {
      resolve(responsePauseBO);
      })
  })
}




getPause(id) {
  return this.#fetchAdvanced(this.#getPauseURL(id)).then((responseJSON) => {
    let pauseBOs = PauseBO.fromJSON(responseJSON);
    // console.info(customerBOs);
    return new Promise(function (resolve) {
      resolve(pauseBOs);
    })
  })
}


updatePause(pauseBO) {
  return this.#fetchAdvanced(this.#updatePauseURL(pauseBO.getID()), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(pauseBO)
  }).then((responseJSON) => {
    // We always get an array of ArbeitszeitkontoBOs.fromJSON
    let responsePauseBO = pauseBO.fromJSON(responseJSON)[0];
    // 
    return new Promise(function (resolve) {
      resolve(responsePauseBO);
    })
  })
}


deletePause(pauseBO) {
  return this.#fetchAdvanced(this.#deletePauseURL(pauseBO), {
    method: 'DELETE'
  }).then((responseJSON) => {
    // We always get an array of ArbeitszeitkontoBO.fromJSON
    let responsePauseBO = pauseBO.fromJSON(responseJSON)[0];
    //
    return new Promise(function (resolve) {
      resolve(responsePauseBO);
    })
  })
}
}