import { useNavigate } from 'react-router-dom';

import profileIcon from '../../../images/profile.svg'

function ProfileButton() {
  const navigate = useNavigate();

  return (
    <div className='menu-button-wrapper'>
      <button className="icon-button" onClick={() => navigate('/profile')}>
        <img src={profileIcon} className="menu-button-image"/>
        <div className='menu-button-txt'>
          Profile
        </div>
      </button> 
    </div>
  );
}

export default ProfileButton