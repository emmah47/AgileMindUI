import logo from '../../images/logo.png'
import placeholderImg from '../../images/placeholderImg.png'
import avatar from '../../images/duck.png'
import logoutIcon from '../../images/logout.svg'
import profileIcon from '../../images/profile.svg'

import React, {useEffect, useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';

import { projectApi } from '../../api/ProjectApi';
import AuthContext from '../context/AuthContext';
import NotifyContext from "../context/NotifyContext";


function UserSummary() {
  const { getUser, userLogout } = useContext(AuthContext);
  const { lastNotifTime, notify } = useContext(NotifyContext);
  const [projectCounts, setProjectCounts] = useState({total : "", completed : "", inProgress : ""})

  const user = getUser();
  let username = user.data.preferred_username;
  username = username.charAt(0).toUpperCase() + username.slice(1);


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
      <div>
        <img src={logo} className='logo-image'/>
      </div>
      <div className='horizontal-line'></div>
      <div className="greeting">
        <div className='greeting-left'>
          <div className='hello-txt'>Hello,</div>
          <div className='username-txt'>{username}</div>
        </div>
        <div className='greeting-right'>
          <img src={avatar} className='profile-picture'></img>
        </div>  
      </div>
      <ProjectStats totalProjects={projectCounts.total} inProgress={projectCounts.inProgress} complete={projectCounts.completed} />
      <div className='menu'>
        <div className='menu-buttons-wrapper'>
          <ProfileButton />
          <LogoutButton userLogout={userLogout}/>
        </div>
      </div>
    </div>
  );
}

function ProjectStats({ totalProjects, inProgress, complete }) {
  return (
    <div className="project-stats-container">
      <div className='project-stat'>
        <div className='project-stat-txt'>Total Projects:</div>
        <div className='project-stat-count'>
          <div className="project-stat-bar project-stat-bar-color1"></div>
          <div>{totalProjects}</div>
        </div> 
      </div>
      <div className='project-stat'>
        <div className='project-stat-txt'>In Progress:</div>
        <div className='project-stat-count'>
          <div className="project-stat-bar project-stat-bar-color2"></div>
          <div>{inProgress}</div>
        </div> 
      </div>
      <div className='project-stat'>
      <div className='project-stat-txt'>Complete:</div>
        <div className='project-stat-count'>
          <div className="project-stat-bar project-stat-bar-color3"></div>
          <div>{complete}</div>
        </div> 
      </div>
    </div>
  );
}

function ProfileButton() {
  const navigate = useNavigate();

  return (
    <div className='menu-button-wrapper'>
      <button className="icon-button" onClick={() => navigate('/profile')}>
        <img src={profileIcon} class="menu-button-image"/>
        <div className='menu-button-txt'>
          Profile
        </div>
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
    <div className='menu-button-wrapper'>
      <button className="icon-button" onClick={handleLogout}>
        <img src={logoutIcon} class="menu-button-image"/>
        <div className='menu-button-txt'>
          Logout
        </div>
      </button> 
    </div>
  );
}

export default UserSummary;