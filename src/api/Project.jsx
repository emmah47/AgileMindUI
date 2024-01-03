import { useState, useEffect } from "react";
import { projectApi } from "./ProjectApi";
import {useAuth} from "../components/context/AuthContext";


// example code for calling backend api to get a list of projects, and then displaying them in a list
function ProjectTable({ projects }) {
  return (
    <>
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
  const Auth = useAuth()
  const user = Auth.getUser()

  useEffect(() => {
    // Fetch the projects data and update the state
    async function fetchProjects() {
      try {
        const response = await projectApi.getProjects(user);
        const prjs = response.data;
        setProjects(prjs);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <p>Your projects:</p>
      <ProjectTable projects={projects} />
    </div>
  );
}
