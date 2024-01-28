import TasksByProject from "./TasksByProject";

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
        <div className="tasks-by-project" key={i}>
          <div className="upcoming-tasks-vertical-bar"></div>
          <div className="task-by-project-right">
            <div className="upcoming-tasks-project-name">{tasksWithSameProject[0].projectName}</div>
            <TasksByProject tasks={copyOfTasksWithSameProject}/>
          </div>
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

export default TasksByDay