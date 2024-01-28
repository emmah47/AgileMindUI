function TasksByProject( {tasks} ) {
  let i = 0;
  let taskDescriptions = tasks.map((task) => {
    i++;
    return <div className="task-description" key={i}>{task.taskContent}</div>
});

  return (
    <div className="task-description-list">
      {taskDescriptions}
    </div>
  );
}

export default TasksByProject