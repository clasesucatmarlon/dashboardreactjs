import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { showAlert } from "../utilities/showAlerts";

const PersonsBootstrap = () => {
  const path = "https://crudrelational.up.railway.app/crudrelational";
  const [persons, setPersons] = useState([]);
  const [id, setId] = useState("");
  const [document, setDocument] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [titleModal, setTitleModal] = useState('');
  const [operation, setOperation] = useState(0);

  useEffect(() => {
    getDataPersons();
  }, []);

  /**
   * The function fetchData is an asynchronous function that retrieves data from a specified URL
   * using either the Fetch API or Axios library and sets the retrieved data to the state variable
   * persons.
   */
  const getDataPersons = async () => {
    const url = path + "/findallpersons";
    try {
      // Usando Axios
      const response = await axios.get(url);
      console.log(response.data);
      setPersons(response.data);
    } catch (error) {
      console.log("Error al recuperar los datos:", error);
    }
  };

  /**
   * The function `openModal` is used to set the title and values of a modal based on the provided
   * option and person details, and it also sets focus on the first name input field after a delay.
   */
  const openModal = (option, id, document, firstName, lastName, email) => {
    resetValues(option);
    if (option === 1) {
      setTitleModal('Register Person');
    } else if (option === 2) {
      setTitleModal('Edit Person');
      setId(id);
      setDocument(document);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
    }
  };

  /**
 * The function `resetValues` resets the values of `idPerson`, `firstName`, `lastName`, and `email`
 * to empty strings.
 */
  const resetValues = (option) => {
    setId('');
    setDocument('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setOperation(option);
  };

  /**
     * The function `validateData` checks if the input data is valid and sends a request to create or
     * update a person accordingly.
     */
  const validateData = () => {
    var parameters;
    var method;
    var url;
    var msg;
    var emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (firstName.trim() === '') {
      showAlert("Write the person's first name correctly", "warning");
    } else if (lastName.trim() === '') {
      showAlert("Write the person's last name correctly", "warning");
    } else if ((!emailRegex.test(email)) || (email.trim() === '')) {
      showAlert("Write the person's email correctly", "warning");
    } else {
      if (operation === 1) {  // Register
        parameters = {
          document: document,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password
        };
        method = "POST";
        url = path + "/createperson";
        msg = "Person created correctly";
      } else {  // Update
        parameters = {
          id: id,
          document: document,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password
        };
        method = "PUT";
        url = path + "/updateperson";
        msg = "Person updated correctly"
      }
      sendRequest(method, parameters, url, msg);
    }
  }


  /**
  * The `deletePerson` function prompts the user with a confirmation dialog to delete a person from the
  * database, and if confirmed, sends a DELETE request to the server.
  */
  const deletePerson = (id, name) => {
    var parameters;
    var method;
    var url;
    var msg;
    const mySwal = withReactContent(Swal);
    mySwal.fire({
      title: "Are you sure you want to delete " + name + " from the database?",
      icon: "question",
      text: "After deletion it cannot be recovered",
      showCancelButton: true,
      confirmButtonText: "Yes, delete"
    }).then(result => {
      if (result.isConfirmed) {
        setId(id);
        parameters = { idPerson: id };
        method = "DELETE";
        url = path + "/deleteperson/" + id;
        msg = name + ",  you have been deleted from the database";
        sendRequest(method, parameters, url, msg);
      } else {
        showAlert(name + ", he has not been deleted from the database", "warning")
      }
    })
  }

  /**
  * The function `sendRequest` is an asynchronous function that sends a request to a specified URL with
  * specified parameters and method, and displays a success or error message based on the response
  * status.
  */
  const sendRequest = async (method, parameters, url, msg) => {
    var icon;
    await axios({ method: method, url: url, data: parameters })
      .then(function (response) {
        var type = response.status;
        console.log(type)
        if (type === 200) {
          icon = "success";
        }
        showAlert(msg, icon);
        getDataPersons();
      })
      .catch(function () {
        showAlert("An error has occurred in the service response", "error");
      })
  }

  return (
    <main className="main-container">
      <div className="main-title text-secondary mb-5">
        <h2>PERSON LIST</h2>
      </div>

      <div className='row mt-3 mb-5'>
        <div className='col-md-4 offset-md-4'>
          <div className='d-grid mx-auto'>
            <button onClick={() => openModal(1)} className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalPersons'>
              <i className="fa-solid fa-circle-plus"></i> Add
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-3 p-3 d-flex justify-center">
        <div className="col-11">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>DOCUMENT</th>
                  <th>FIRSTNAME</th>
                  <th>LASTNAME</th>
                  <th>EMAIL</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {
                  persons.map(element => (
                    <tr key={element.id}>
                      <td>{element.document}</td>
                      <td>{element.firstName}</td>
                      <td>{element.lastName}</td>
                      <td>{element.email}</td>
                      <td>
                        <button
                          onClick={() => openModal(2, element.id, element.document, element.firstName, element.lastName, element.email)}
                          className="btn btn-warning"
                          data-bs-toggle='modal'
                          data-bs-target='#modalPersons'
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        &nbsp;
                        <button onClick={() => deletePerson(element.id, element.firstName)} className="btn btn-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-secondary">Total de personas: {persons.length}</h3>
          </div>
        </div>

      </div>


      <div id='modalPersons' className="modal fade" aria-hidden='true'>
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header text-primary">
              <label className="h5">{titleModal}</label>
              <button type='button' className="btn-close aaa" data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id='id'></input>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-address-card"></i></span>
                <input
                  type="text"
                  id='document'
                  className="form-control"
                  placeholder="Document"
                  value={document}
                  onChange={e => setDocument(e.target.value)}
                >
                </input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-file-signature"></i></span>
                <input
                  type="text"
                  id='firstName'
                  className="form-control"
                  placeholder="First Name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                >
                </input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-signature"></i></span>
                <input
                  type="text"
                  id='lastName'
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                >
                </input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-envelope"></i></span>
                <input
                  type="text"
                  id='email'
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                >
                </input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-key"></i></span>
                <input
                  type="password"
                  id='password'
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                >
                </input>
              </div>

              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validateData()} className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i> Save
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type='button' id='btnCerrar' className="btn btn-secondary" data-bs-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>


    </main>
  )
}

export default PersonsBootstrap