import TasksByDay from "./TasksByDay";

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

export default Tasks