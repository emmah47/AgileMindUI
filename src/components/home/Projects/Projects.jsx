import React, {useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import NotifyContext from "../../context/NotifyContext";
import AuthContext from "../../context/AuthContext";
import { projectApi } from "../../../api/ProjectApi";

import Header from "./header";
import ProjectsList from "./ProjectsList";

import './Projects.css'


function Projects() {
  const { getUser } = useContext(AuthContext);
  const { lastNotifTime, notify } = useContext(NotifyContext);

  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("by-recent");
  const user = getUser();

  useEffect(() => {
    async function fetchProjects() {
      try {
        let response = await projectApi.getProjects(user);
        setProjects(response.data);
      } catch(error) {
        console.error("Error: ", error);
      }
    }
    fetchProjects();
  }, [lastNotifTime]);

  function onSearch(event) {
    event.preventDefault();
    setSearchText(event.target.value);
  }

  function onFilter(event) {
    event.preventDefault();
    setSortBy(event.target.value);
  }


  return (
    <div className="projects">
      <Header onSearch={onSearch} onFilter={onFilter}/>
      <ProjectsList projects={projects} searchText={searchText} sortBy={sortBy} notify={notify}/> 
    </div>
  );
}

export default Projects;