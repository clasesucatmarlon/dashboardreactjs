import { useEffect, useState } from "react";
import axios from "axios";

const Persons = () => {
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



  return (
    <main className="main-container">
      <div className="main-title">
        <h2>PERSON LIST</h2>
      </div>


    </main>
  )
}

export default Persons