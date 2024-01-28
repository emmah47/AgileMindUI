import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../../context/NotifyContext";
import { projectApi } from "../../../api/ProjectApi";
import AuthContext from '../../context/AuthContext';

import DateDisplay from "./DateDisplay"
import Tasks from "./Tasks";

import "./UpcomingTasks.css"


function UpcomingTasks() {
  const { getUser } = useContext(AuthContext);
  const { lastNotifTime, notify } = useContext(NotifyContext);
  const [recentTasks, setRecentTasks] = useState([]); 
  const user = getUser();

  useEffect(() => {
    async function fetchUpcomingTasks() {
      try {
        const DAYS_UNTIL_DUE = 7; // hardcoded, have to change this later
        const response = await projectApi.getUpcomingTasks(user, DAYS_UNTIL_DUE);
        setRecentTasks(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchUpcomingTasks();
    
  }, [lastNotifTime]);

  return (
    <div className="upcoming-tasks">
      <DateDisplay />
      <Tasks recentTasks={recentTasks}/>
    </div>
  );
}

export default UpcomingTasks;