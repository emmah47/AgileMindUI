import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import AuthContext from "../context/AuthContext";

import NavBar from "./NavBar";
import { projectApi } from "../../api/ProjectApi";


function Project() {
  const [activeTab, setActiveTab] = useState("sprint");
  const [project, setProject] = useState({});
  const { id } = useParams();
  const { getUser } = useContext(AuthContext);

  const user = getUser();

  useEffect(() => {
    async function fetchProject() {
      try {
        let response = await projectApi.getProject(user, id);
        setProject(response.data);
      } catch(error) {
        console.error("Error: ", error);
      }
    }
    fetchProject();
  }, []);

  return (
    <div>
      <NavBar />
      {/* implement navigation logic to render different components here based on "project" state */}
    </div>
  );

}


export default Project;