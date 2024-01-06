import { useState, useEffect } from "react";
import { projectApi } from "./ProjectApi";
import { useAuth } from "../components/context/AuthContext";


// example code for calling backend api to get a list of projects, and then displaying them in a list
function ProjectTable({ projects, projectCounts }) {
  const {total, completed, inProgress } = projectCounts;

  return (
    <>
      <div>total: {total}, completed: {completed}, inProgress: {inProgress}</div>
      <div>
        Number of Projects: {projects.length}
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </>
    
  );
}

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [projectCounts, setProjectCounts] = useState({total: 0, completed: 0, inProgress: 0})
  const Auth = useAuth()
  const user = Auth.getUser()

  useEffect(() => {
    // Fetch the projects data and update the state
    async function fetchProjects() {
      try {
        const response = await projectApi.getProjects(user);
        const prjs = response.data;
        setProjects(prjs);
        debugger;
        const response2 = await projectApi.getProjectCounts(user);
        const prjCnts = response2.data;
        setProjectCounts(prjCnts);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchProjects();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <p>Your projects:</p>
      <ProjectTable projects={projects} projectCounts={projectCounts} />
    </div>
  );
}
