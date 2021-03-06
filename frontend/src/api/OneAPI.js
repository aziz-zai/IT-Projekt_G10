import UserBO from "./UserBO";
import ProjectBO from "./ProjectBO";
import MembershipBO from "./MembershipBO";
import ProjektarbeitBO from "./ProjektarbeitBO";
import ZeitintervallbuchungBO from "./ZeitintervallbuchungBO";
import GehenBO from "./GehenBO";
import EreignisBO from "./EreignisBO";
import KommenBO from "./KommenBO";
import EreignisbuchungBO from "./EreignisbuchungBO";
import AbwesenheitBO from "./AbwesenheitBO";
import AktivitätenBO from "./AktivitätenBO";
import PauseBO from "./PauseBO";
import ArbeitszeitkontoBO from "./ArbeitszeitkontoBO";
import ZeitintervallBO from "./ZeitintervallBO";

export default class OneAPI {
  // Singelton instance
  static #api = null;

  // Backend URL
  #OneServerBaseURL = "/projectone";

  // User related
  #getUserGidURL = (google_user_id) =>
    `${this.#OneServerBaseURL}/users-by-gid/${google_user_id}`;
  #getUserURL = (id) => `${this.#OneServerBaseURL}/users/${id}`;
  #updateUserURL = (id) => `${this.#OneServerBaseURL}/users/${id}`;
  #deleteUserURL = (id) => `${this.#OneServerBaseURL}/users/${id}`;
  #getPotentialMembersURL = (user, project) =>
    `${this.#OneServerBaseURL}/potential-members/${user}/${project}`;

  // Project related
  #getProjectsURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #addProjectsURL = (user) => `${this.#OneServerBaseURL}/projects/${user}`;
  #updateProjectURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #deleteProjectURL = (id) => `${this.#OneServerBaseURL}/projects/${id}`;
  #getProjektlaufzeitURL = (id) =>
    `${this.#OneServerBaseURL}/projektlaufzeit/${id}`;
  #addProjektlaufzeitBeginn = (user, bezeichnung) =>
    `${this.#OneServerBaseURL}/projektlaufzeitAnfang/${user}/${bezeichnung}`;
  #addProjektlaufzeitEnde = (user, projektAnfang, bezeichnung) =>
    `${
      this.#OneServerBaseURL
    }/projektlaufzeitEnde/${user}/${projektAnfang}/${bezeichnung}`;

  //Membership related
  #addMembershipURL = () => `${this.#OneServerBaseURL}/membership`;
  #getMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;
  #getMembersByProjectURL = (project) =>
    `${this.#OneServerBaseURL}/members-by-project/${project}`;
  #getProjektleiterByProjectURL = (project) =>
    `${this.#OneServerBaseURL}/projektleiter-by-project/${project}`;
  #getMembershipByUserURL = (id) =>
    `${this.#OneServerBaseURL}/membership-by-user/${id}`;
  #getMembershipByUserAndProjectURL = (id) =>
    `${this.#OneServerBaseURL}/membership-by-user-and-project/${id}`;
  #updateMembershipURL = (id) => `${this.#OneServerBaseURL}/membership/${id}`;
  #deleteMembershipURL = (user, project) =>
    `${this.#OneServerBaseURL}/membership/${user}/${project}`;

  //Abwesenheit related
  #getAbwesenheitURL = (id) => `${this.#OneServerBaseURL}/abwesenheit/${id}`;
  #addAbwesenheitBeginnURL = (user, abwesenheitsart) =>
    `${this.#OneServerBaseURL}/abwesenheitBeginn/${user}/${abwesenheitsart}`;
  #addAbwesenheitEndeURL = (abwesenheitsBeginn, user, abwesenheitsart) =>
    `${
      this.#OneServerBaseURL
    }/abwesenheitEnde/${abwesenheitsBeginn}/${user}/${abwesenheitsart}`;
  #updateAbwesenheitURL = (id) => `${this.#OneServerBaseURL}/abwesenheit/${id}`;
  #deleteAbwesenheitURL = (id) => `${this.#OneServerBaseURL}/abwesenheit/${id}`;

  //Aktivitäten related
  #getAktivitätenByIdURL = (id) =>
    `${this.#OneServerBaseURL}/aktivitaeten/${id}`;
  #getAktivitätenByProjectIdURL = (project) =>
    `${this.#OneServerBaseURL}/aktivitaeten-by-project/${project}`;
  #addAktivitätenURL = () => `${this.#OneServerBaseURL}/aktivitaeten`;
  #updateAktivitätenURL = (id) =>
    `${this.#OneServerBaseURL}/aktivitaeten/${id}`;
  #deleteAktivitätenURL = (id) =>
    `${this.#OneServerBaseURL}/aktivitaeten/${id}`;

  //Projektarbeit related
  #getProjektarbeitURL = (id) =>
    `${this.#OneServerBaseURL}/projektarbeiten/${id}`;
  #getProjektarbeitByActivityURL = (activity, user) =>
    `${this.#OneServerBaseURL}/projektarbeiten-activity/${activity}/${user}`;
  #getProjektarbeitByStartURL = (start) =>
    `${this.#OneServerBaseURL}/projektarbeit-by-start/${start}`;
  #addProjektarbeitURL = () => `${this.#OneServerBaseURL}/projektarbeiten`;
  #updateProjektarbeitURL = (id) =>
    `${this.#OneServerBaseURL}/projektarbeiten/${id}`;
  #deleteProjektarbeitURL = (id) =>
    `${this.#OneServerBaseURL}/projektarbeiten/${id}`;

  //Zeitintervallbuchung related
  #getZeitintervallbuchungURL = (id) =>
    `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;
  #addZeitintervallbuchungURL = () =>
    `${this.#OneServerBaseURL}/zeitintervallbuchung`;
  #updateZeitintervallbuchungURL = (id) =>
    `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;
  #deleteZeitintervallbuchungURL = (id) =>
    `${this.#OneServerBaseURL}/zeitintervallbuchung/${id}`;
  #getZeitintervallbuchungSollURL = (user, startFilter, endFilter) =>
    `${
      this.#OneServerBaseURL
    }/zeitintervallbuchung-soll/${user}/${startFilter}/${endFilter}`;
  #getZeitintervallbuchungIstURL = (user, startFilter, endFilter) =>
    `${
      this.#OneServerBaseURL
    }/zeitintervallbuchung-ist/${user}/${startFilter}/${endFilter}`;
  #getProjektarbeitbuchungIstURL = (user, startFilter, endFilter, activity) =>
    `${
      this.#OneServerBaseURL
    }/projektarbeitbuchung-ist/${user}/${startFilter}/${endFilter}/${activity}`;
  #getProjektarbeitbuchungSollURL = (user, startFilter, endFilter, activity) =>
    `${
      this.#OneServerBaseURL
    }/projektarbeitbuchung-soll/${user}/${startFilter}/${endFilter}/${activity}`;
  #getProjektarbeitbuchungByProjectSollURL = (user, project) =>
    `${
      this.#OneServerBaseURL
    }/zeitintervallbuchung-soll-by-akt/${user}/${project}`;
  #getProjektarbeitbuchungByProjectIstURL = (user, project) =>
    `${
      this.#OneServerBaseURL
    }/zeitintervallbuchung-ist-by-akt/${user}/${project}`;

  //Ereignisbuchung related
  #addEreignisbuchungURL = () => `${this.#OneServerBaseURL}/ereignisbuchung`;
  #getEreignisbuchungURL = (id) =>
    `${this.#OneServerBaseURL}/ereignisbuchung/${id}`;
  #getEreignisbuchungISTURL = (user, startFilter, endFilter) =>
    `${
      this.#OneServerBaseURL
    }/ereignisbuchungen-ist/${user}/${startFilter}/${endFilter}`;
  #getEreignisbuchungSOLLURL = (user, startFilter, endFilter) =>
    `${
      this.#OneServerBaseURL
    }/ereignisbuchungen-soll/${user}/${startFilter}/${endFilter}`;
  #updateEreignisbuchungURL = (id) =>
    `${this.#OneServerBaseURL}/ereignisbuchungen/${id}`;
  #deleteEreignisbuchungURL = (id) =>
    `${this.#OneServerBaseURL}/ereignisbuchungen/${id}`;

  //Ereignis related
  #addEreignisURL = () => `${this.#OneServerBaseURL}/ereignis`;
  #getEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  #updateEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;
  #deleteEreignisURL = (id) => `${this.#OneServerBaseURL}/ereignis/${id}`;

  //Kommen related
  #addKommenIstURL = (user, projektarbeit, kommenZeit) =>
    `${
      this.#OneServerBaseURL
    }/kommen-ist/${user}/${projektarbeit}/${kommenZeit}`;
  #addKommenSollURL = (erstellt_von, erstellt_fuer) =>
    `${this.#OneServerBaseURL}/kommen-soll/${erstellt_von}/${erstellt_fuer}`;
  #getKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;
  #updateKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;
  #deleteKommenURL = (id) => `${this.#OneServerBaseURL}/kommen/${id}`;

  //Gehen related
  #getGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;
  #addGehenIstURL = (projektarbeitid, user, activity, gehenZeit) =>
    `${
      this.#OneServerBaseURL
    }/gehen-ist/${projektarbeitid}/${user}/${activity}/${gehenZeit}`;
  #addGehenSollURL = (
    kommen,
    erstellt_von,
    erstellt_fuer,
    activity,
    projektarbeit
  ) =>
    `${
      this.#OneServerBaseURL
    }/gehen-soll/${kommen}/${erstellt_von}/${erstellt_fuer}/${activity}/${projektarbeit}`;
  #updateGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;
  #deleteGehenURL = (id) => `${this.#OneServerBaseURL}/gehen/${id}`;

  //Pause related
  #addPausenBeginnURL = (user) =>
    `${this.#OneServerBaseURL}/pausenBeginn/${user}`;
  #addPausenEndeURL = (pausenBeginn, user) =>
    `${this.#OneServerBaseURL}/pausenEnde/${pausenBeginn}/${user}`;
  #getPauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;
  #updatePauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;
  #deletePauseURL = (id) => `${this.#OneServerBaseURL}/pausen/${id}`;

  //Arbeitszeitkonto related
  #getArbeitszeitkontoURL = (user) =>
    `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${user}`;
  #updateArbeitszeitkontoURL = (user) =>
    `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${user}`;
  #deleteArbeitszeitkontoURL = (user) =>
    `${this.#OneServerBaseURL}/arbeitszeitkonto-by-user/${user}`;

  //Zeitintervall related
  #addZeitintervallURL = () => `${this.#OneServerBaseURL}/zeitintervall`;
  #getZeitintervallURL = (id) =>
    `${this.#OneServerBaseURL}/zeitintervall/${id}`;
  #updateZeitintervallURL = (id) =>
    `${this.#OneServerBaseURL}/zeitintervall/${id}`;
  #deleteZeitintervallURL = (id) =>
    `${this.#OneServerBaseURL}/zeitintervall/${id}`;

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
  #fetchAdvanced = (url, init) =>
    fetch(url, { credentials: "include", ...init }).then((res) => {
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });

  /**
   * User related
   */

  getUserGid(google_user_id) {
    return this.#fetchAdvanced(this.#getUserGidURL(google_user_id)).then(
      (responseJSON) => {
        let usersBOs = UserBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(usersBOs);
        });
      }
    );
  }

  getUser(id) {
    return this.#fetchAdvanced(this.#getUserURL(id)).then((responseJSON) => {
      let usersBOs = UserBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(usersBOs);
      });
    });
  }

  getPotentialMembers(user, project) {
    return this.#fetchAdvanced(
      this.#getPotentialMembersURL(user, project)
    ).then((responseJSON) => {
      let usersBOs = UserBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(usersBOs);
      });
    });
  }

  updateUser(userBO) {
    return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(userBO),
    }).then((responseJSON) => {
      // We always get an array of UserBO.fromJSON
      let responseUserBO = UserBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseUserBO);
      });
    });
  }

  deleteUser(id) {
    return this.#fetchAdvanced(this.#deleteUserURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      // We always get an array of UserBO.fromJSON
      let responseUserBO = UserBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseUserBO);
      });
    });
  }

  /**
   * Project related
   */

  getProject(id) {
    return this.#fetchAdvanced(this.#getProjectsURL(id)).then(
      (responseJSON) => {
        let projectsBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectsBOs);
        });
      }
    );
  }

  addProject(projectBO, user) {
    return this.#fetchAdvanced(this.#addProjectsURL(user), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(projectBO),
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      });
    });
  }
  addProjektlaufzeitBeginn(ereignisBO, user, bezeichnung) {
    return this.#fetchAdvanced(
      this.#addProjektlaufzeitBeginn(user, bezeichnung),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(ereignisBO),
      }
    ).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseProjectBO = EreignisBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      });
    });
  }
  addProjektlaufzeitEnde(ereignisBO, user, projektAnfang, bezeichnung) {
    return this.#fetchAdvanced(
      this.#addProjektlaufzeitEnde(user, projektAnfang, bezeichnung),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(ereignisBO),
      }
    ).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON, but only need one object
      let responseProjectBO = ZeitintervallBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      });
    });
  }

  updateProject(projectBO) {
    return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getID()), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(projectBO),
    }).then((responseJSON) => {
      // We always get an array of ProjectBOs.fromJSON
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      });
    });
  }

  getProjektlaufzeit(id) {
    return this.#fetchAdvanced(this.#getProjektlaufzeitURL(id)).then(
      (responseJSON) => {
        let projectsBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectsBOs);
        });
      }
    );
  }

  deleteProject(id) {
    return this.#fetchAdvanced(this.#deleteProjectURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      });
    });
  }

  /**
   * Membership related
   */

  getMembership(id) {
    return this.#fetchAdvanced(this.#getMembershipURL(id)).then(
      (responseJSON) => {
        let membershipBOs = MembershipBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(membershipBOs);
        });
      }
    );
  }

  getMembersByProject(project) {
    return this.#fetchAdvanced(this.#getMembersByProjectURL(project)).then(
      (responseJSON) => {
        let membershipBOs = UserBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(membershipBOs);
        });
      }
    );
  }

  getProjektleiterByProject(project) {
    return this.#fetchAdvanced(
      this.#getProjektleiterByProjectURL(project)
    ).then((responseJSON) => {
      let membershipBOs = UserBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      });
    });
  }

  getMembershipByUser(user) {
    return this.#fetchAdvanced(this.#getMembershipByUserURL(user)).then(
      (responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
        });
      }
    );
  }

  getMembershipByUserAndProject(user, project) {
    return this.#fetchAdvanced(
      this.#getMembershipByUserAndProjectURL(user, project)
    ).then((responseJSON) => {
      let membershipBOs = ProjectBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(membershipBOs);
      });
    });
  }

  addMembership(membershipBO) {
    return this.#fetchAdvanced(this.#addMembershipURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(membershipBO),
    }).then((responseJSON) => {
      let responseMembershipBO = MembershipBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseMembershipBO);
      });
    });
  }

  updateMembership(membershipBO) {
    return this.#fetchAdvanced(
      this.#updateMembershipURL(membershipBO.getID()),
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(membershipBO),
      }
    ).then((responseJSON) => {
      let responseMembershipBO = MembershipBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseMembershipBO);
      });
    });
  }

  deleteMembership(user, project) {
    return this.#fetchAdvanced(this.#deleteMembershipURL(user, project), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseMembershipBO = MembershipBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseMembershipBO);
      });
    });
  }

  /**
   * Projektarbeit related
   */

  getProjektarbeit(id) {
    return this.#fetchAdvanced(this.#getProjektarbeitURL(id)).then(
      (responseJSON) => {
        let projektarbeitenBOs = ProjektarbeitBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projektarbeitenBOs);
        });
      }
    );
  }

  getProjektarbeitByActivity(activity, user) {
    return this.#fetchAdvanced(
      this.#getProjektarbeitByActivityURL(activity, user)
    ).then((responseJSON) => {
      let projektarbeitenBOs = ProjektarbeitBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(projektarbeitenBOs);
      });
    });
  }

  getProjektarbeitByStart(start) {
    return this.#fetchAdvanced(this.#getProjektarbeitByStartURL(start)).then(
      (responseJSON) => {
        let projektarbeitenBOs = ProjektarbeitBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projektarbeitenBOs);
        });
      }
    );
  }

  addProjektarbeit(projektarbeitBO) {
    return this.#fetchAdvanced(this.#addProjektarbeitURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(projektarbeitBO),
    }).then((responseJSON) => {
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      });
    });
  }

  updateProjektarbeit(projektarbeitBO, id) {
    return this.#fetchAdvanced(this.#updateProjektarbeitURL(id), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(projektarbeitBO),
    }).then((responseJSON) => {
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      });
    });
  }

  gehenProjektarbeit(projektarbeitBO) {
    return this.#fetchAdvanced(
      this.#updateProjektarbeitURL(projektarbeitBO.getID()),
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(projektarbeitBO),
      }
    ).then((responseJSON) => {
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      });
    });
  }

  deleteProjektarbeit(id) {
    return this.#fetchAdvanced(this.#deleteProjektarbeitURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseProjektarbeitBO = ProjektarbeitBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjektarbeitBO);
      });
    });
  }

  /**
   * Zeitintervallbuchung related
   */

  getZeitintervallbuchung(id) {
    return this.#fetchAdvanced(this.#getZeitintervallbuchungURL(id)).then(
      (responseJSON) => {
        let zeitintervallbuchungBOs =
          ZeitintervallbuchungBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(zeitintervallbuchungBOs);
        });
      }
    );
  }

  getZeitintervallbuchungSoll(user, startFilter, endFilter) {
    return this.#fetchAdvanced(
      this.#getZeitintervallbuchungSollURL(user, startFilter, endFilter)
    ).then((responseJSON) => {
      let zeitintervallbuchungBOs =
        ZeitintervallbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervallbuchungBOs);
      });
    });
  }

  getZeitintervallbuchungIst(user, startFilter, endFilter) {
    return this.#fetchAdvanced(
      this.#getZeitintervallbuchungIstURL(user, startFilter, endFilter)
    ).then((responseJSON) => {
      let zeitintervallbuchungBOs =
        ZeitintervallbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervallbuchungBOs);
      });
    });
  }
  getProjektarbeitbuchungIst(user, startFilter, endFilter, activity) {
    return this.#fetchAdvanced(
      this.#getProjektarbeitbuchungIstURL(
        user,
        startFilter,
        endFilter,
        activity
      )
    ).then((responseJSON) => {
      let zeitintervallbuchungBOs =
        ZeitintervallbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervallbuchungBOs);
      });
    });
  }
  getProjektarbeitbuchungSoll(user, startFilter, endFilter, activity) {
    return this.#fetchAdvanced(
      this.#getProjektarbeitbuchungSollURL(
        user,
        startFilter,
        endFilter,
        activity
      )
    ).then((responseJSON) => {
      let zeitintervallbuchungBOs =
        ZeitintervallbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervallbuchungBOs);
      });
    });
  }

  getProjektarbeitbuchungByProjectSoll(user, project) {
    return this.#fetchAdvanced(
      this.#getProjektarbeitbuchungByProjectSollURL(user, project)
    ).then((responseJSON) => {
      let zeitintervallbuchungBOs =
        ZeitintervallbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervallbuchungBOs);
      });
    });
  }

  getProjektarbeitbuchungByProjectIst(user, project) {
    return this.#fetchAdvanced(
      this.#getProjektarbeitbuchungByProjectIstURL(user, project)
    ).then((responseJSON) => {
      let zeitintervallbuchungBOs =
        ZeitintervallbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(zeitintervallbuchungBOs);
      });
    });
  }

  addZeitintervallbuchung(zeitintervallbuchungBO) {
    return this.#fetchAdvanced(this.#addZeitintervallbuchungURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(zeitintervallbuchungBO),
    }).then((responseJSON) => {
      let responseZeitintervallbuchungBO =
        ZeitintervallbuchungBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseZeitintervallbuchungBO);
      });
    });
  }

  updateZeitintervallbuchung(zeitintervallbuchungBO, id) {
    return this.#fetchAdvanced(
      this.#updateZeitintervallbuchungURL(id),
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(zeitintervallbuchungBO),
      }
    ).then((responseJSON) => {
      let responseZeitintervallbuchungBO =
        ZeitintervallbuchungBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseZeitintervallbuchungBO);
      });
    });
  }

  deleteZeitintervallbuchung(id) {
    return this.#fetchAdvanced(this.#deleteZeitintervallbuchungURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseZeitintervallbuchungBO =
        ZeitintervallbuchungBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseZeitintervallbuchungBO);
      });
    });
  }

  /**
   * Ereignis related
   */
  addEreignis(ereignisBO) {
    return this.#fetchAdvanced(this.#addEreignisURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(ereignisBO),
    }).then((responseJSON) => {
      let responseEreignisBO = EreignisBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseEreignisBO);
      });
    });
  }

  getEreignis(id) {
    return this.#fetchAdvanced(this.#getEreignisURL(id)).then(
      (responseJSON) => {
        let ereignisBOs = EreignisBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ereignisBOs);
        });
      }
    );
  }

  updateEreignis(ereignisBO) {
    return this.#fetchAdvanced(this.#updateEreignisURL(ereignisBO.getID()), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(ereignisBO),
    }).then((responseJSON) => {
      let responseEreignisBO = EreignisBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseEreignisBO);
      });
    });
  }

  deleteEreignis(id) {
    return this.#fetchAdvanced(this.#deleteEreignisURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseEreignisBO = EreignisBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseEreignisBO);
      });
    });
  }

  /**
   * Gehen related
   */
  getGehen(id) {
    return this.#fetchAdvanced(this.#getGehenURL(id)).then((responseJSON) => {
      let gehenBOs = GehenBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(gehenBOs);
      });
    });
  }

  addGehenIst(projektarbeit, user, aktivität, gehenZeit) {
    return this.#fetchAdvanced(
      this.#addGehenIstURL(projektarbeit, user, aktivität, gehenZeit),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
      }
    ).then((responseJSON) => {
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      });
    });
  }
  addGehenSoll(
    gehenBO,
    kommen,
    erstelltVon,
    erstelltFuer,
    aktivität,
    projektarbeit
  ) {
    return this.#fetchAdvanced(
      this.#addGehenSollURL(
        kommen,
        erstelltVon,
        erstelltFuer,
        aktivität,
        projektarbeit
      ),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(gehenBO),
      }
    ).then((responseJSON) => {
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      });
    });
  }

  updateGehen(gehenBO, id) {
    return this.#fetchAdvanced(this.#updateGehenURL(id), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(gehenBO),
    }).then((responseJSON) => {
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      });
    });
  }

  deleteGehen(id) {
    return this.#fetchAdvanced(this.#deleteGehenURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseGehenBO = GehenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGehenBO);
      });
    });
  }

  /**
   * Kommen related
   */

  addKommenIst(user, projektarbeit, kommenZeit) {
    return this.#fetchAdvanced(
      this.#addKommenIstURL(user, projektarbeit, kommenZeit),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
      }
    ).then((responseJSON) => {
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      });
    });
  }

  addKommenSoll(kommenBO, erstellt_von, erstellt_fuer) {
    return this.#fetchAdvanced(
      this.#addKommenSollURL(erstellt_von, erstellt_fuer),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(kommenBO),
      }
    ).then((responseJSON) => {
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      });
    });
  }

  getKommen(id) {
    return this.#fetchAdvanced(this.#getKommenURL(id)).then((responseJSON) => {
      let kommenBOs = KommenBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(kommenBOs);
      });
    });
  }

  updateKommen(kommenBO, id) {
    return this.#fetchAdvanced(this.#updateKommenURL(id), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(kommenBO),
    }).then((responseJSON) => {
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      });
    });
  }

  deleteKommen(id) {
    return this.#fetchAdvanced(this.#deleteKommenURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseKommenBO = KommenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseKommenBO);
      });
    });
  }

  /**
   * Abwesenheit related
   */

  getAbwesenheit(id) {
    return this.#fetchAdvanced(this.#getAbwesenheitURL(id)).then(
      (responseJSON) => {
        let abwesenheitBOs = AktivitätenBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(abwesenheitBOs);
        });
      }
    );
  }

  addAbwesenheitBeginn(abwesenheitBO, user, abwesenheitsart) {
    return this.#fetchAdvanced(
      this.#addAbwesenheitBeginnURL(user, abwesenheitsart),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(abwesenheitBO),
      }
    ).then((responseJSON) => {
      let responseAbwesenheitBO = EreignisBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseAbwesenheitBO);
      });
    });
  }

  addAbwesenheitEnde(abwesenheitBO, abwesenheitBeginn, user, abwesenheitsart) {
    return this.#fetchAdvanced(
      this.#addAbwesenheitEndeURL(abwesenheitBeginn, user, abwesenheitsart),
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(abwesenheitBO),
      }
    ).then((responseJSON) => {
      let responseAbwesenheitBO = EreignisBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseAbwesenheitBO);
      });
    });
  }

  updateAbwesenheit(abwesenheitBO) {
    return this.#fetchAdvanced(
      this.#updateAbwesenheitURL(abwesenheitBO.getID()),
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(abwesenheitBO),
      }
    ).then((responseJSON) => {
      let responseAbwesenheitBO = AbwesenheitBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseAbwesenheitBO);
      });
    });
  }

  deleteAbwesenheit(id) {
    return this.#fetchAdvanced(this.#deleteAbwesenheitURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseAbwesenheitBO = AbwesenheitBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseAbwesenheitBO);
      });
    });
  }

  /**
   * Aktivitäten related
   */

  getAktivitätenById(id) {
    return this.#fetchAdvanced(this.#getAktivitätenByIdURL(id)).then(
      (responseJSON) => {
        let aktivitätenBOs = AktivitätenBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(aktivitätenBOs);
        });
      }
    );
  }

  getAktivitätenByProjectId(project) {
    return this.#fetchAdvanced(
      this.#getAktivitätenByProjectIdURL(project)
    ).then((responseJSON) => {
      let aktivitätenBOs = AktivitätenBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(aktivitätenBOs);
      });
    });
  }

  addAktivitäten(aktivitätenBO) {
    return this.#fetchAdvanced(this.#addAktivitätenURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(aktivitätenBO),
    }).then((responseJSON) => {
      let responseAktivitätenBO = AktivitätenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseAktivitätenBO);
      });
    });
  }

  updateAktivitäten(aktvitätBO, id) {
    return this.#fetchAdvanced(this.#updateAktivitätenURL(id), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(aktvitätBO),
    }).then((responseJSON) => {
      let responseAktivitätenBO = AktivitätenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseAktivitätenBO);
      });
    });
  }

  deleteAktivitäten(id) {
    return this.#fetchAdvanced(this.#deleteAktivitätenURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseAktivitätenBO = AktivitätenBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseAktivitätenBO);
      });
    });
  }

  /**
   * Ereignisbuchung related
   */

  addEreignisbuchung(ereignisbuchungBO) {
    return this.#fetchAdvanced(this.#addEreignisbuchungURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(ereignisbuchungBO),
    }).then((responseJSON) => {
      let responseEreignisbuchungBO =
        EreignisbuchungBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseEreignisbuchungBO);
      });
    });
  }

  getEreignisbuchung(id) {
    return this.#fetchAdvanced(this.#getEreignisbuchungURL(id)).then(
      (responseJSON) => {
        let ereignisbuchungBOs = EreignisbuchungBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ereignisbuchungBOs);
        });
      }
    );
  }

  getEreignisbuchungIST(user, startFilter, endFilter) {
    return this.#fetchAdvanced(
      this.#getEreignisbuchungISTURL(user, startFilter, endFilter)
    ).then((responseJSON) => {
      let ereignisbuchungBOs = EreignisbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(ereignisbuchungBOs);
      });
    });
  }

  getEreignisbuchungSOLL(user, startFilter, endFilter) {
    return this.#fetchAdvanced(
      this.#getEreignisbuchungSOLLURL(user, startFilter, endFilter)
    ).then((responseJSON) => {
      let ereignisbuchungBOs = EreignisbuchungBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(ereignisbuchungBOs);
      });
    });
  }

  updateEreignisbuchung(ereignisbuchungBO) {
    return this.#fetchAdvanced(
      this.#updateEreignisbuchungURL(ereignisbuchungBO.getID()),
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(ereignisbuchungBO),
      }
    ).then((responseJSON) => {
      // We always get an array of EreignisbuchungBOs.fromJSON
      let responseEreignisbuchungBO =
        EreignisbuchungBO.fromJSON(responseJSON)[0];
      //
      return new Promise(function (resolve) {
        resolve(responseEreignisbuchungBO);
      });
    });
  }

  deleteEreignisbuchung(id) {
    return this.#fetchAdvanced(this.#deleteEreignisbuchungURL(id), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseEreignisbuchungBO =
        EreignisbuchungBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseEreignisbuchungBO);
      });
    });
  }

  /**
   * Arbeitszeitkonto related
   */

  getArbeitszeitkonto(user) {
    return this.#fetchAdvanced(this.#getArbeitszeitkontoURL(user)).then(
      (responseJSON) => {
        let arbeitszeitkontoBOs = ArbeitszeitkontoBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(arbeitszeitkontoBOs);
        });
      }
    );
  }

  updateArbeitszeitkonto(arbeitszeitkontoBO) {
    return this.#fetchAdvanced(
      this.#updateArbeitszeitkontoURL(arbeitszeitkontoBO.getID()),
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(arbeitszeitkontoBO),
      }
    ).then((responseJSON) => {
      let responseArbeitszeitkontoBO =
        ArbeitszeitkontoBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseArbeitszeitkontoBO);
      });
    });
  }

  deleteArbeitszeitkonto(arbeitszeitkontoBO) {
    return this.#fetchAdvanced(
      this.#deleteArbeitszeitkontoURL(arbeitszeitkontoBO),
      {
        method: "DELETE",
      }
    ).then((responseJSON) => {
      let responseArbeitszeitkontoBO =
        ArbeitszeitkontoBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseArbeitszeitkontoBO);
      });
    });
  }

  /**
   * Pause related
   */

  getPause(id) {
    return this.#fetchAdvanced(this.#getPauseURL(id)).then((responseJSON) => {
      let pauseBOs = PauseBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(pauseBOs);
      });
    });
  }

  updatePause(pauseBO) {
    return this.#fetchAdvanced(this.#updatePauseURL(pauseBO.getID()), {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pauseBO),
    }).then((responseJSON) => {
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      });
    });
  }

  deletePause(pauseBO) {
    return this.#fetchAdvanced(this.#deletePauseURL(pauseBO), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      });
    });
  }

  /**
   * Zeitintervall related
   */

  addZeitintervall(zeitintervallBO) {
    return this.#fetchAdvanced(this.#addZeitintervallURL(), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(zeitintervallBO),
    }).then((responseJSON) => {
      let responseZeitintervallBO =
        ZeitintervallbuchungBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseZeitintervallBO);
      });
    });
  }

  getZeitintervall(id) {
    return this.#fetchAdvanced(this.#getZeitintervallURL(id)).then(
      (responseJSON) => {
        let zeitintervallBOs = ZeitintervallBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(zeitintervallBOs);
        });
      }
    );
  }

  updateZeitintervall(zeitintervallBO) {
    return this.#fetchAdvanced(
      this.#updateZeitintervallURL(zeitintervallBO.getID()),
      {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-type": "application/json",
        },
        body: JSON.stringify(zeitintervallBO),
      }
    ).then((responseJSON) => {
      let responseZeitintervallBO = ZeitintervallBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseZeitintervallBO);
      });
    });
  }

  deleteZeitintervall(zeitintervallBO) {
    return this.#fetchAdvanced(this.#deleteZeitintervallURL(zeitintervallBO), {
      method: "DELETE",
    }).then((responseJSON) => {
      let responseZeitintervallBO = ZeitintervallBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseZeitintervallBO);
      });
    });
  }

  addPausenBeginn(pauseBO, user) {
    return this.#fetchAdvanced(this.#addPausenBeginnURL(user), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pauseBO),
    }).then((responseJSON) => {
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      });
    });
  }

  addPausenEnde(pauseBO, pausenBeginn, user) {
    return this.#fetchAdvanced(this.#addPausenEndeURL(pausenBeginn, user), {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pauseBO),
    }).then((responseJSON) => {
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      });
    });
  }
}
