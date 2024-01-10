import logo from '../../images/logo-placeholder.png'
import placeholderImg from '../../images/placeholderImg.png'


import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';

import { projectApi } from '../../api/ProjectApi';
import AuthContext from '../context/AuthContext';
import NotifyContext from "../context/NotifyContext";


function UserSummary() {
  const { getUser, userLogout } = useContext(AuthContext);
  const { lastNotifTime, notify } = useContext(NotifyContext);
  const [projectCounts, setProjectCounts] = useState({total : 0, completed : 0, inProgress : 0})

  const user = getUser();
  let username = user.data.name; 

  useEffect(() => {
    async function fetchProjectCounts() {
      try {
        const response = await projectApi.getProjectCounts(user);
        setProjectCounts(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchProjectCounts();
  }, [lastNotifTime]);

  return (
    <div className="user-summary">
      <div className="greeting">
        <p>Hello, {username}</p>
        <img src={placeholderImg} className='profilePicture'></img>
      </div>
      <img src={logo} className='logo'/>
      <ProjectStats totalProjects={projectCounts.total} inProgress={projectCounts.inProgress} complete={projectCounts.completed} />
      <ProfileButton />
      <LogoutButton userLogout={userLogout}/>
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
  const navigate = useNavigate();

  return (
    <div className='profile-button'>
      <img src = {placeholderImg} />
      <button onClick={() => navigate('/profile')}>
        Profile
      </button> 
    </div>
  );
}

function LogoutButton( {userLogout} ) {
  const navigate = useNavigate();

  function handleLogout() {
    userLogout()
    navigate('/login')
  }

  return (
    <div className='logout-button'>
      <img src = {placeholderImg} />
      <button onClick={handleLogout}>
        Logout
      </button> 
    </div>
  );
}

export default UserSummary;