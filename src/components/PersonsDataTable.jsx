import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const PersonsDataTable = () => {
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
      // console.log(response.data);
      setPersons(response.data);
      setPersonsFilter(response.data);
    } catch (error) {
      console.log("Error al recuperar los datos:", error);
    }
  };

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: false,
    },
    {
      name: 'Document',
      sortable: true,
      selector: row => row.document,
    },
    {
      name: 'First Name',
      sortable: true,
      selector: row => row.firstName,
    },
    {
      name: 'Last Name',
      sortable: true,
      selector: row => row.lastName,
    },
    {
      name: 'Email',
      sortable: true,
      selector: row => row.email,
    },
  ];

  const paginationOptions = {
    rowsPerPageText: "Rows for page",
    rangeSeparatorText: "of",
    selectAllRowsItem: true,
    selectAllRowsItemText: "All",
  }

  const handleFilter = (event)  => {
    const newData = persons.filter(row => {
      return row.firstName.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setPersonsFilter(newData)
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h2>PERSON LIST</h2>
      </div>

      <div className="table-responsive">
        <div className="textx-end d-flex justify-content-end align-items-center pb-5">
          <label htmlFor="search" className="p-2">Search:</label>
          <input type="text" className="p-2 w-50" name="search" onChange={handleFilter}/>
        </div>
        <DataTable 
          columns={columns}
          data={personsFilter}
          pagination // paginación
          paginationComponentOptions={paginationOptions}
          fixedHeader
          fixedHeaderScrollHeight="600px"
        />
      </div>


    </main>
  )
}

export default PersonsDataTable;