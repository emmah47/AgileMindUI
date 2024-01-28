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

export default ProjectStats