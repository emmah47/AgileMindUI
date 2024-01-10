import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';

import NotifyContext from "../context/NotifyContext";
import AuthContext from "../context/AuthContext";
import { projectApi } from "../../api/ProjectApi";

import './home.css'


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
      <ProjectsList projects={projects} searchText={searchText} sortBy={sortBy}/> 
    </div>
  );
}

function Header({ onSearch, onFilter }) {
  return (
    <div>
      <p className="project-header-title">My Projects</p>
      <Sort onFilter={onFilter}/>
      <SearchBar onSearch={onSearch}/>
    </div>
  );
}

function Sort({ onFilter }) {
  return (
    <div className="sort-selection">
      <span>Sort </span>
      <select name="sort-options" onChange={(e) => onFilter(e)}>
       <option value="by-recent" name="by-recent">By Recent</option>
       <option value="by-name" name="by-name">By Name</option>
       <option value="creation-time" name="creation-time">Creation Time</option>
     </select>
    </div>
  );
}

function SearchBar( {onSearch} ) {

  return (
    <form onChange={(e) => onSearch(e)} className="search-bar">
      <input type="text" placeholder="Search..." />
    </form>
  );
}

function ProjectsList( {projects, searchText, sortBy} ) {
  let filteredProjectsList = projects.filter((project) => {
      return project.name.toLowerCase().includes(searchText.toLowerCase());
  });


  let filteredProjectsComponentsList = projects.map((project) => {
    return (<div key={project.id}><Project project={project} /></div>);
  });

  filteredProjectsComponentsList.unshift(<div key="add-project-button"><AddProjectButton /></div>)

  return (
    <div>{filteredProjectsComponentsList}</div>
  );
}

function AddProjectButton() {
  return (
    <button className="add-project-button">
      Start New Project
    </button>
  );
}

function Project( {project} ) {
  // hardcoded constants, must make api endpoint later
  const NUM_ACTIVE_STORIES = 7;
  const SPRINT_DAYS_LEFT = 11;
  const navigate = useNavigate();

  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit' 
  };

  function handleButtonClick() {
    console.log(`/project/${project.id}/sprint`);
    navigate(`/project/${project.id}/sprint`);

  }

  return (
    <div className="project">
      <div className="project-border">
        <button onClick={handleButtonClick}>
          <p>{project.name}</p>
          <p>{new Date(project.lastOpenedDate).toLocaleDateString(undefined, dateOptions)}</p>
          <p>Active Stories: {NUM_ACTIVE_STORIES}</p>
          <p>Sprint Days Left: {SPRINT_DAYS_LEFT}</p>
        </button>
      </div>
    </div>
  );
}

export default Projects;