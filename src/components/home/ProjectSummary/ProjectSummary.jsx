import logo from '../../../images/logo.png'
import avatar from '../../../images/duck.png'

import React, {useEffect, useState, useContext} from "react";

import { projectApi } from '../../../api/ProjectApi';
import AuthContext from '../../context/AuthContext';
import NotifyContext from "../../context/NotifyContext";

import ProjectStats from './ProjectStats';
import ProfileButton from './ProfileButton';
import LogoutButton from './LogoutButton';


import './ProjectSummary.css'


function ProjectSummary() {
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

export default ProjectSummary;