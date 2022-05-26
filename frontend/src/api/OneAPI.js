import UserBO from './UserBO';
import ProjectBO from './ProjectBO';
import MembershipBO from './MembershipBO';
import ArbeitszeitkontoBO from './ArbeitszeitkontoBO';
import PauseBO from './PauseBO';



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
  #getArbeitszeitkontoURL = (user) => `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${user}`;
  #updateArbeitszeitkontoURL = (user) => `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${user}`;
  #deleteArbeitszeitkontoURL = (user) => `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${user}`;
  #addArbeitszeitkontoURL = (user) => `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${user}`;

  //Projektarbeit related

  //Zeitintervallbuchung related

  //Ereignisbuchung related

  //Ereignis related

  //Kommen related

  //Gehen related

  //Pause related
  #addPauseURL = () => `${this.#OneServerBaseURL}/pausen/${}`;
  #getPauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;
  #updatePauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;
  #deletePauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;

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

  addArbeitszeitkonto(arbeitszeitkontoBO) {
    return this.#fetchAdvanced(this.#addArbeitszeitkontoURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(arbeitszeitkontoBO)
    }).then((responseJSON) => {
      // We always get an array of ArbeitszeitkontoBOs.fromJSON, but only need one object
      let responseArbeitszeitkontoBO = arbeitszeitkontoBO.fromJSON(responseJSON)[0];
      // 
      return new Promise(function (resolve) {
        resolve(responseArbeitszeitkontoBO);
        })
    })
  }
 





  addPause(PauseBO) {
    return this.#fetchAdvanced(this.#addPauseURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(pauseBO)
    }).then((responseJSON) => {
      // We always get an array of ArbeitszeitkontoBOs.fromJSON, but only need one object
      let responsePauseBO = pauseBO.fromJSON(responseJSON)[0];
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
        resolve(PauseBOs);
      })
    })
  }
  
  
  updatePause(pauseBO) {
    return this.#fetchAdvanced(this.#updatePauseURL(pauseBO.getID(id)), {
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
