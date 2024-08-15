import React, { useContext, useState, useCallback } from 'react';
import { UserContext } from '../context/UserContext'; 
import LoginSignupModal from './LoginSignupModal'; 

const LoginSignupButton = ({ textProp, styleProp }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Function to close the modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    closeModal();
  }, [setIsLoggedIn, closeModal]);

  return ( 
    <div>
      <button className={`${styleProp} border-[1.6px] border-gray-100 rounded-xl`} onClick={openModal}>
        {textProp}
      </button>
      <LoginSignupModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        initialAction = {textProp}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
 
export default LoginSignupButton;
