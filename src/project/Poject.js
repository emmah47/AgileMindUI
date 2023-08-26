import { useState, useEffect } from "react";
import { projectApi } from "../api/ProjectApi";
import {useAuth} from "../context/AuthContext";



function ProjectTable({ projects }) {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>{project.name}aaa</li>
      ))}
    </ul>
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
        debugger;
        setProjects(prjs);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      <p>hahaha</p>
      <ProjectTable projects={projects} />
    </div>
  );
}