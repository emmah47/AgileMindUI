import React, {useEffect, useState, useContext} from "react";

import NotifyContext from "../context/NotifyContext";
import { projectApi } from "../../api/ProjectApi";
import AuthContext from '../context/AuthContext';

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

function DateDisplay() {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit' 
  };

  return (
    <div className="date-display">
      <div className="date-display-text">Today's Date</div>
      <div className="date-display-text-day">{new Date().toLocaleDateString(undefined, options)}</div>
    </div>
  );
}

// assumes recentTasks is sorted
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
      <div className="tasks-upcoming-text">
        Upcoming
      </div>
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
      tasksByProject.push(
        <div key={i}>
          <p>{tasksWithSameProject[0].projectName}</p>
          <TasksByProject tasks={copyOfTasksWithSameProject}/>
        </div> 
      );
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
  let i = 0;
  let taskDescriptions = tasks.map((task) => {
    i++;
    return <div key={i}>{task.taskContent}</div>
});

  return (
    <div>
      {taskDescriptions}
    </div>
  );
}

export default UpcomingTasks;