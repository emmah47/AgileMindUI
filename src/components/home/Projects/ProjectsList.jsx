import NotifyContext from "../../context/NotifyContext";

import Project from "./Project"
import AddProjectButton from "./AddProjectButton";

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

export default ProjectsList