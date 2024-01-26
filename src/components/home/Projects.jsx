import searchIcon from "../../images/search.svg"
import addProjectIcon from "../../images/add_project_icon.svg"

import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';

import NotifyContext from "../context/NotifyContext";
import AuthContext from "../context/AuthContext";
import { projectApi } from "../../api/ProjectApi";
import AddProjectPopup from "./AddProjectPopup";

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

function Header({ onSearch, onFilter }) {
  return (
    <div className="projects-header">
      <p className="projects-header-title">My Projects</p>
      <Sort onFilter={onFilter}/>
      <SearchBar onSearch={onSearch}/>
    </div>
  );
}

function Sort({ onFilter }) {
  return (
    <div className="sort-selection">
      <div className="sort-label">Sort </div>
      <select className="sort-options" name="sort-options" onChange={(e) => onFilter(e)}>
       <option value="by-recent" name="by-recent">By Recent</option>
       <option value="by-name" name="by-name">By Name</option>
       <option value="creation-time" name="creation-time">Creation Time</option>
     </select>
    </div>
  );
}

function SearchBar( {onSearch} ) {

  return (
    <form onChange={(e) => onSearch(e)}>
      <div className="search-bar-wrapper">
        <div className="search-bar-container">
            <input className="search-text" type="text" placeholder="Search..." />
          <div className="search-icon">
            <img className="search-icon-img" src={searchIcon}></img>
          </div>
        </div>
      </div>
    </form>
  );
}

function ProjectsList( {projects, searchText, sortBy, notify} ) {
  // used to control add projects popup
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    notify();
  };

  // filter by search text
  let filteredProjectsList = projects.filter((project) => {
      return project.name.toLowerCase().includes(searchText.toLowerCase());
  });

  // sort projects based on sortBy
  let SortedProjectsList;
  switch (sortBy) {
    case "by-recent":
      SortedProjectsList = filteredProjectsList.sort((p1, p2) => {
        // fsr projects is empty when this runs for the first time so we have to check if its null
        const date1 = p1?.lastOpenedDate ? new Date(p1.lastOpenedDate).getTime() : 0;
        const date2 = p2?.lastOpenedDate ? new Date(p2.lastOpenedDate).getTime() : 0;
        return date2 - date1;
      });
      break;
    case "by-name":
      SortedProjectsList = filteredProjectsList.sort((p1, p2) => {
        const name1 = p1?.name ? p1.name : "";
        const name2 = p2?.name ? p2.name : "";
        return name1.localeCompare(name2);
      });
      break;
    case "creation-time":
      SortedProjectsList = filteredProjectsList.sort((p1, p2) => {
        const date1 = p1?.creationDate ? new Date(p1.creationDate).getTime() : 0;
        const date2 = p2?.creationDate ? new Date(p2.creationDate).getTime() : 0;
        return date2 - date1;
      });
      break;
  }

  // make each project into a component and put it in a list
  let filteredProjectsComponentsList = SortedProjectsList.map((project) => {
    return (<div className="project-button" key={project.id}><Project project={project} /></div>);
  });

  // put the add project button at the front of the list
  filteredProjectsComponentsList.unshift(<div key="add-project-button" className="add-project-button-wrapper"><AddProjectButton togglePopup={togglePopup}/></div>)

  return (
    <div>
      <div className="projects-container">
        {filteredProjectsComponentsList}
      </div>
      {isOpen && (
        <div>
          <div className="overlay"></div>
          <div className="popup">
            <AddProjectPopup togglePopup={togglePopup}/>
          </div>
        </div>
      )}
    </div>
    
  );
}

function AddProjectButton({ togglePopup }) {
  return (
    <div onClick={togglePopup} className="add-project-button">
      <div className="add-project-icon-wrapper">
        <img className="add-project-icon" src={addProjectIcon}/>
      </div>
    </div>
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

  return (
    <div className="project">
      <div className="project-details" onClick={() => navigate(`/project/${project.id}`)}>
        <div className="project-name">{project.name}</div>
        <div className="project-date">{new Date(project.lastOpenedDate).toLocaleDateString(undefined, dateOptions)}</div>
        {project.status === "IN_PROGRESS" ? (
          <div>
            <div className="active-stories">Active Stories: {NUM_ACTIVE_STORIES}</div>
            <div className="sprint-days-left">Sprint Days Left: {SPRINT_DAYS_LEFT}</div>
          </div>
        ) : (
          <div className="complete-status">Status: Complete</div>
        )}
        
      </div>
    </div>
  );
}

export default Projects;