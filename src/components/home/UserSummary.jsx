import logo from '../../images/logo-placeholder.png'
import placeholderImg from '../../images/placeholderImg.png'


import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../context/NotifyContext";

function UserSummary() {
  const [count, setCount] = useState(0);
  const { lastNotifTime, notify } = useContext(NotifyContext)
  let username = "username"; // use api call here 
  let totalProjects = 0;
  let inProgress = 0;
  let complete = 0;

  useEffect(() => {
    const prevCount = count;
    setCount(prevCount + 1);
  }, [lastNotifTime]);

  return (
    <div className="user-summary">
      <div className="greeting">
        Hello, {username}
      </div>
      <img src={logo} className='logo'/>
      <ProjectStats totalProjects={totalProjects} inProgress={inProgress} complete={complete} />
      <ProfileButton />
      <LogoutButton />
      User Summary: {count}
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