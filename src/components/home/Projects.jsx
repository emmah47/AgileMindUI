import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../context/NotifyContext";


function Projects() {
  const { lastNotifTime, notify } = useContext(NotifyContext);

  useEffect(() => {
    // redo api calls here
  }, [lastNotifTime]);


  return (
    <div className="projects">
      <Header />
      <ProjectsList projects={[]}/> {/* give actual list of projects here */}
    </div>
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
      <select name="sort-options">
       <option value="by-recent" name="by-recent">By Recent</option>
       <option value="by-name" name="by-name">By Name</option>
       <option value="creation-time" name="creation-time">Creation Time</option>
     </select>
    </div>
  );
}

function SearchBar() {
  function search(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("query");
    // call some callback that performs the search here
  }

  return (
    <form onSubmit={search} className="search-bar">
      <input name="query" />
      <button type="submit" name="search-btn">Search</button>
    </form>
  );
}

function ProjectsList( {projects} ) {
  let projectsList = projects.map((project) => {
    return (<ul><Project project={project} /></ul>);
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