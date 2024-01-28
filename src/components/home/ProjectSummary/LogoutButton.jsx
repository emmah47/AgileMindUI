import logoutIcon from '../../../images/logout.svg'

import { useNavigate } from 'react-router-dom';

function LogoutButton( {userLogout} ) {
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

  return (
    <div className='menu-button-wrapper'>
      <button className="icon-button" onClick={handleLogout}>
        <img src={logoutIcon} className="menu-button-image"/>
        <div className='menu-button-txt'>
          Logout
        </div>
      </button> 
    </div>
  );
}

export default LogoutButton