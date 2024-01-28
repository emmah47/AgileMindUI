import { useNavigate } from "react-router-dom";

function Project( {project} ) {
  // hardcoded constants, must make api endpoint later
  const NUM_ACTIVE_STORIES = 7;
  const SPRINT_DAYS_LEFT = 11;
  const navigate = useNavigate();

  const dateOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: '2-digit' 
  };

  return (
    <div className="project">
      <div className="project-details" onClick={() => navigate(`/project/${project.id}`)}>
        <div className="project-name">{project.name}</div>
        <div className="project-date">{new Date(project.lastOpenedDate).toLocaleDateString(undefined, dateOptions)}</div>
        {project.status === "IN_PROGRESS" ? (
          <div>
            <div className="active-stories">Active Stories: {NUM_ACTIVE_STORIES}</div>
            <div className="sprint-days-left">Sprint Days Left: {SPRINT_DAYS_LEFT}</div>
          </div>
        ) : (
          <div className="complete-status">Status: Complete</div>
        )}
        
      </div>
    </div>
  );
}

export default Project