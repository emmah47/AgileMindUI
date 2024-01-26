import instance from './Axios'

export const projectApi = {
  getProjects,
  getProject,
  addProject,
  getProjectCounts,
  getUpcomingTasks,
  generateUserStoriesFromRequirements,
}

function getProjects(user) {
  const url ='/projects';
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function getProject(user, projectId) {
  const url =`/projects/${projectId}`;
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function addProject(user, project) {
  return instance.post('/projects', project, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(user)
    }
  })
}

function getProjectCounts(user) {
  const url ='/projects/counts';
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}

function getUpcomingTasks(user, daysUntilDue) {
  const url = `/projects/upcoming-tasks?daysUntilDue=${daysUntilDue}`;
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}


// This project id is hardcoded for testing purposes. Must change to variable when using.
function generateUserStoriesFromRequirements(user) {
  const url ='/projects/64e13b4cfb9653544f6353c7/user-stories/generate';
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  });
}


function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}
