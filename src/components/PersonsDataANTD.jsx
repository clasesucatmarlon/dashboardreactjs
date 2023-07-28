import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from 'antd';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { showAlert } from "../utilities/showAlerts";


const PersonsDataANTD = () => {
  const path = "https://crudrelational.up.railway.app/crudrelational";
  const [persons, setPersons] = useState([]);
  const [personsFilter, setPersonsFilter] = useState([]);
  const [id, setId] = useState("");
  const [document, setDocument] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [titleModal, setTitleModal] = useState('');
  const [operation, setOperation] = useState(0);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      // Usando Axios
      const response = await axios.get(url);
      // console.log(response.data);
      setPersons(response.data);
      setPersonsFilter(response.data);
      setLoading(false);
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



  const columns = [
    // {
    //   title: 'ID',
    //   width: 100,
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (_, record) => (
    //     <>
    //       <span className="p-2 bg-red-400">{record.id} </span>
    //     </>
    //   )
    // },
    {
      title: 'Document',
      dataIndex: 'document',
      key: 'document',
      sorter: (a, b) => a.document - b.document,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <span>{text.toUpperCase()}</span>,
      sorter: (a, b) => a.firstName.length - b.firstName.length,
    },
    {
      title: 'Last Name'.toUpperCase(),
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.length - b.lastName.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: 'Actions',
      dataIndex: '',
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center">
          <button
            onClick={() => openModal(2, record.id, record.document, record.firstName, record.lastName, record.email)}
            className="btn btn-warning px-2"
            data-bs-toggle='modal'
            data-bs-target='#modalPersons'
          >
            <i className="fa-solid fa-edit"></i>
          </button>
          &nbsp;
          &nbsp;
          <button
            onClick={() => deletePerson(record.id, record.firstName)}
            className="btn btn-danger px-2"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )
    },
  ];


  /**
   * The `handleFilter` function filters an array of persons based on a search value and updates the
   * filtered data in state.
   */
  const handleFilter = (event) => {
    const newData = persons.filter(row => {
      return (
        row.document.includes(event.target.value) ||
        row.firstName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.lastName.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.email.toLowerCase().includes(event.target.value.toLowerCase())
      )
    })
    setPersonsFilter(newData)
  }

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
  const deletePerson = (id, name = "standar") => {
    console.log("id a borrar ", id)
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
    <main className="main-container bg-[#f0f0f0] flex flex-col justify-center justify-items-center">
      <div className="main-title">
        <h2 className="" >PERSON LIST</h2>
      </div>

      <div className="flex flex-column align-items-center table-responsive p-6 ">

        <div className="flex justify-between bg-[#263043] border p-2 mb-4 text-black w-11/12 text-white">
          {/* FILTER */}
          <div className="flex align-items-center">
            <label htmlFor="search" className="font-bold mr-2">Search:</label>
            <input type="text" className="p-2 text-black" name="search" onChange={handleFilter} />
          </div>
          {/* ADD BUTTON */}
          <div className=''>
            <button onClick={() => openModal(1)} className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalPersons'>
              <i className="fa-solid fa-circle-plus"></i> Add
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="w-11/12 flex justify-center align-items-center">
          <Table
            columns={columns}
            dataSource={personsFilter}
            bordered='true'
            loading={loading}
            size="small"
            pagination={{pageSize: 5}}
          /> 
        </div>
      </div>

        {/* MODAL */}
        <div id='modalPersons' className="modal fade" aria-hidden='true'>
          <div className="modal-dialog ">
            <div className="modal-content">
              <div className="modal-header text-primary">
                <label className="h5 text-black">{titleModal}</label>
                <button type='button' className="btn-close" data-bs-dismiss='modal' aria-label='Close'>
                  <i className="fa-solid fa-rectangle-xmark"></i>
                </button>
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
                  <button onClick={() => validateData()} className="btn bg-primary text-white">
                    <i className="fa-solid fa-floppy-disk"></i> Save
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button type='button' id='btnCerrar' className="btn bg-secondary text-white" data-bs-dismiss='modal'>Close</button>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}


    </main>
  )
}

export default PersonsDataANTD;