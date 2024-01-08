import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../context/NotifyContext";
import { projectApi } from "../../api/ProjectApi";
import AuthContext from '../context/AuthContext';


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
        console.log(response.data);
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

function DateDisplay() {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit' 
  };

  return (
    <div className="date-display">
      <p>Today's Date</p>
      <p>{new Date().toLocaleDateString(undefined, options)}</p>
    </div>
  );
}

// assums recentTasks is sorted
function Tasks({ recentTasks }) {
  const tasksByDay = [];
  const length = recentTasks.length;
  let tasksWithSameDay = [];

  // group tasks by day and make components from those groups
  for (let i = 0; i < length; i++) {
    let currRecentTask = recentTasks[i];
    tasksWithSameDay.push(currRecentTask)

    // // if on last element or if task has different due date:
    if (i === length - 1 || recentTasks[i + 1].daysUntilDue != currRecentTask.daysUntilDue) {
      let copyOfTasksWithSameDay = tasksWithSameDay.slice();
      tasksByDay.push(<TasksByDay key={i} tasks={copyOfTasksWithSameDay}/>);
      tasksWithSameDay = [];
    }
  }

  return(
    <div className="tasks">
      <p>
        Upcoming
      </p>
      <div className="tasks-by-day-list">
        {tasksByDay}
      </div>
    </div>
  );
}

function TasksByDay( {tasks} ) {
  const days = tasks[0].daysUntilDue;
  const length = tasks.length;
  let tasksWithSameProject = [];
  let tasksByProject = [];

  // group tasks by project and make components from those groups
  for (let i = 0; i < length; i++) {
    let currTask = tasks[i];
    tasksWithSameProject.push(currTask)

    // // if on last element or if task has different due project:
    if (i === length - 1 || tasks[i + 1].projectId != currTask.projectId) {
      let copyOfTasksWithSameProject = tasksWithSameProject.slice();
      tasksByProject.push(<TasksByProject key={i} tasks={copyOfTasksWithSameProject}/>);
      tasksWithSameProject = [];
    }
  }

  return(
    <div className="task-by-day">
      <div className="tasks-days-until-due">
        {days === 1? `1 Day` : days + ` Days`}
      </div>
      <div className="tasks-by-projects-list">
        {tasksByProject}
      </div>
    </div>
  );
}

function TasksByProject( {tasks} ) {
  let taskDescriptions = tasks.map((task) => task.taskContent);

  return (
    <div>
      {taskDescriptions}
    </div>
  );
}

export default UpcomingTasks;