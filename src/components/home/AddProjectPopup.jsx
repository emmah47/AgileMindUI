import { useState, useContext } from 'react'
// import { ObjectID } from 'mongodb'

import AuthContext from "../context/AuthContext";
import { projectApi } from "../../api/ProjectApi";



// this is supposed to render when u click on the add project button 
function AddProjectPopup({ togglePopup }) {
  const { getUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({name : "", description: "", status:"IN_PROGRESS"});
  const user = getUser();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  }

  async function handleAdd(event) {
    event.preventDefault();
    await postProject(formData);
    togglePopup();
  }

  async function postProject(project) {
    console.log("posting project!");
    try {
      await projectApi.addProject(user, project);
      console.log("finished posting project!");
    } catch (error) {
      console.error("Error: ", error);
    };
  }

  return (
  <div>
    <p>Add A Project</p>
    <form onSubmit={handleAdd}>
      <label id="name_label" name="name_label" htmlFor="name">Name: </label>
      <input id="name" name="name" value={formData.name} onChange={handleChange}/>

      <br />

      <label id="description_label" name="description_label" htmlFor="description">Description: </label>
      <input id="description" name="description" value={formData.description} onChange={handleChange}/>

      <br />
  
      <button id='submit_button' name='submit_button' type="submit">Add</button>
    </form>
    <button id='cancel_button' onClick={togglePopup}>Cancel</button>
  </div>
  );
}

export default AddProjectPopup;