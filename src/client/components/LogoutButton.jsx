import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { UserContext } from '../context/UserContext';

const LogoutButton = ({styleProp, iconProp, textStyle}) => {
  const { setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    // try {
    //   const response = await fetch('http://localhost:8080/api/logout', {
    //     method: 'POST',
    //     credentials: 'include',  // Include cookies with the request
    //   });

    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include',  // Include cookies with the request
      });


      if (response.ok) {
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center ${styleProp}`}
    >
      <Icon icon="ic:round-logout" className={iconProp} />
      <span className={textStyle}>Logout</span>
    </button>
  );
};

export default LogoutButton;
