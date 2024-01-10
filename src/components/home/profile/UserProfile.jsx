import { useContext } from "react";

import AuthContext from "../../context/AuthContext";

function UserProfile() {
  const { getUser } = useContext(AuthContext);
  const user = getUser()
  
  return(
    <div>
      <p>User Profile</p>
      <p>{user.data.name}</p>
    </div>
  );
}


export default UserProfile;