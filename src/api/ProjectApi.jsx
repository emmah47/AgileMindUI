import instance from './Axios'

export const projectApi = {
  getProjects,
  generateUserStoriesFromRequirements,
}

function getProjects(user, text) {
  const url ='/projects'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}

// This project id is hardcoded for testing purposes. Must change to variable when using.
function generateUserStoriesFromRequirements(user) {
  const url ='/projects/64e13b4cfb9653544f6353c7/user-stories/generate'
  return instance.get(url, {
    headers: { 'Authorization': bearerAuth(user) }
  })
}


function bearerAuth(user) {
  return `Bearer ${user.accessToken}`
}
