import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../context/NotifyContext";


function Projects() {
  const { lastNotifTime, notify } = useContext(NotifyContext);

  useEffect(() => {
    // redo api calls here
  }, [lastNotifTime]);


  return (
    <>
      <Header />
      <ProjectsList projects={[]}/> {/* give actual list of projects here */}
    </>
  );
}

function Header() {
  return (
    <div>
      <p>My Projects</p>
      <Sort />
      <SearchBar />
    </div>
  );
}

function Sort() {
  return (
    <div>
      <p>Sort</p>
      <select>
       <option value="by-recent">By Recent</option>
       <option value="by-name">By Name</option>
       <option value="creation-time">Creation Time</option>
     </select>
    </div>
  );
}

function SearchBar() {
  return (
    <input name="search" />
  );
}

function ProjectsList( {projects} ) {
  let projectsList = projects.map((project) => {
    <ul><Project project={project} /></ul>
  });

  return (
    <li>{projectsList}</li>
  );
}

// turn project json into an object or smth like that
function Project(project) {
  return (
    <div>
      A Project
    </div>
  );
}

export default Projects;