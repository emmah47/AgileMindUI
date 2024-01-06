import logo from '../../images/logo-placeholder.png'
import placeholderImg from '../../images/placeholderImg.png'


import React, {useEffect, useState, useContext} from "react";

import { projectApi } from '../../api/ProjectApi';
import AuthContext from '../context/AuthContext';
import NotifyContext from "../context/NotifyContext";


function UserSummary() {
  const { getUser } = useContext(AuthContext);
  const { lastNotifTime, notify } = useContext(NotifyContext);
  const [projectCounts, setProjectCounts] = useState({total : 0, completed : 0, inProgress : 0})

  const user = getUser();
  let username = user.data.name; 
  let totalProjects = 0;
  let inProgressProjects = 0;
  let completedProjects = 0;

  useEffect(() => {
    async function fetchProjectCounts() {
      try {
        const response = await projectApi.getProjectCounts(user);
        const projectCounts = response.data;
        setProjectCounts(projectCounts);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchProjectCounts();
  }, [lastNotifTime]);

  return (
    <div className="user-summary">
      <div className="greeting">
        Hello, {username}
      </div>
      <img src={logo} className='logo'/>
      <ProjectStats totalProjects={projectCounts.total} inProgress={projectCounts.inProgress} complete={projectCounts.completed} />
      <ProfileButton />
      <LogoutButton />
      <button onClick={notify}>Click here</button>
    </div>
  );
}

function ProjectStats({ totalProjects, inProgress, complete }) {
  return (
    <div className="project-stats">
      <div>
        <span>Total Projects:</span> {totalProjects}
      </div>
      <div>
        <span>In Progress:</span> {inProgress}
      </div>
      <div>
        <span>Complete:</span> {complete}
      </div>
    </div>
  );
}

function ProfileButton() {
  return (
    <div className='profile-button'>
      <img src = {placeholderImg} />
      <button>Profile</button> {/* Add onclick = notify here */}
    </div>
  );
}

function LogoutButton() {
  return (
    <div className='logout-button'>
      <img src = {placeholderImg} />
      <button>Logout</button> 
    </div>
  );
}

export default UserSummary;