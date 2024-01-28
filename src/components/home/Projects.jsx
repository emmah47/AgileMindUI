import searchIcon from "../../images/search.svg"
import addProjectIcon from "../../images/add_project_icon.svg"

import React, {useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import NotifyContext from "../context/NotifyContext";
import AuthContext from "../context/AuthContext";
import { projectApi } from "../../api/ProjectApi";

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

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
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onChange={(e) => onSearch(e)} onSubmit={handleSubmit}>
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
  filteredProjectsComponentsList.unshift(<AddProjectButton key="add-project-button" notify={notify}/>)

  return (
    <div className="projects-container">
      {filteredProjectsComponentsList}
    </div>
    
  );
}

function AddProjectButton({ notify }) {
  const { getUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({name : "", description: "", status:"IN_PROGRESS"});
  const isError = formData.name === "";
  const user = getUser();

  function handleClose() {
    notify();
    onClose();
  }

  async function handleCreateProject(event) {
    event.preventDefault();
    await postProject(formData);
    handleClose();
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

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name] : value,
    }));
  }
  
  return (
    <div>
      <div className="add-project-button-wrapper" onClick={onOpen}>
        <div className="add-project-button">
          <div className="add-project-icon-wrapper">
            <img className="add-project-icon" src={addProjectIcon}/>
            <div className="add-project-text">
              Start New Project
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Project</ModalHeader>
          <ModalBody>
            <FormControl isInvalid={isError} mb="3">
              <FormLabel>Name:</FormLabel>
              <Input id="name" name="name" value={formData.name} onChange={handleChange}/>
              {isError && <FormErrorMessage>Name cannot be empty</FormErrorMessage>}
            </FormControl>
            <FormLabel>Description:</FormLabel>
            <Input id="description" name="description" mb="3" onChange={handleChange}/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClose} mr={4}>Cancel</Button>
            <Button onClick={handleCreateProject} colorScheme="teal">Create Project</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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