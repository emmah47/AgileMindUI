import React, {useEffect, useState, useContext} from "react";


function UpcomingTasks() {
  const projects = [] // replace api call
  const recentTasks = [] // calculate from projects

  return (
    <div className="upcoming-tasks">
      <DateDisplay />
      <Tasks recentTasks={recentTasks}/>
    </div>
  );
}

function DateDisplay() {

  return (
    <div className="date-display">
      <p>Today's Date</p>
      <p>{new Date().toString().substring(0, 15)}</p>
    </div>
  );
}

function Tasks({ recentTasks }) {
  const tasks = recentTasks.map((recentTask) => {
    return (<RecentTask recentTask={recentTask} />);
  });

  return(
    <div className="tasks">
      <p>
        Upcoming
      </p>
      <div className="recent-tasks">
        {tasks}
      </div>
    </div>
  );
}

export default UpcomingTasks;