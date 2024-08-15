import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; 
import LoginSignupModal from './LoginSignupModal'; 

// Button component for handling navigation and user authentication
const Button = ({ styleProp, textProp }) => {
  const navigate = useNavigate(); // For navigation
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext); // User authentication context
  const [isModalOpen, setIsModalOpen] = React.useState(false); // Modal state

  // Handle button click: navigate if logged in, else open modal
  const handleBookServiceClick = () => {
    if (isLoggedIn) {
      navigate('/booking');
    } else {
      setIsModalOpen(true);
    }
  };

  // On successful login: update state and navigate
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    navigate('/booking');
  };

  return (
    <div>
      <button className={`${styleProp}`} onClick={handleBookServiceClick}>
        {textProp}
      </button>
      <LoginSignupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Button;
