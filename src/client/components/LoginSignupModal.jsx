import React, { useState, useEffect, useCallback, useReducer, useContext } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PasswordResetModals from './PasswordResetModals';
import { Icon } from '@iconify/react/dist/iconify.js';
import classNames from 'classnames';

// Initial state for form inputs
const initialState = {
  email: '',
  firstname: '',
  lastname: '',
  password: '',
};

// Reducer function to manage form input state
function reducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_FIRSTNAME':
      return { ...state, firstname: action.payload };
    case 'SET_LASTNAME':
      return { ...state, lastname: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// Component for individual input fields with icons, placeholders, and error handling
const InputField = ({ label, type, icon, value, onChange, error, placeholder, togglePassword }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <div className="relative">
      <Icon icon={icon} className="absolute left-3 top-4 w-[18px] h-[18px] text-gray-400" />
      <div className="absolute left-10 top-4 bottom-3 w-px h-[18px] bg-stone-300"></div>
      <input
        type={type}
        className={classNames(
          'w-full p-3 pl-14 pr-10 border rounded-lg text-black outline-2 focus:outline focus:outline-red-500',
          error ? 'border-red-500' : 'border-gray-300'
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {togglePassword && (
        <Icon
          icon={type === 'password' ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}
          onClick={togglePassword}
          className="absolute right-3 top-4 text-stone-400 w-5 h-5 cursor-pointer"
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  </div>
);

const LoginSignupModal = ({ isOpen, onClose, initialAction }) => {
  const [action, setAction] = useState(initialAction || 'Sign In'); // State to manage current form (Sign In or Sign Up)
  const [state, dispatch] = useReducer(reducer, initialState); // State management for form inputs
  const [errors, setErrors] = useState({}); // State to track form validation errors
  const { setIsLoggedIn } = useContext(UserContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Correct visibility state
  const navigate = useNavigate();
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  // Sanitize input values to prevent unnecessary data from being submitted
  const sanitizeInput = (input) => input.trim();

  // Validate form inputs before submission
  const validate = useCallback(() => {
    const newErrors = {};

    if (!state.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!state.password) {
      newErrors.password = 'Password is required';
    } else if (state.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (action === 'Sign Up') {
      if (!state.firstname) {
        newErrors.firstname = 'First name is required';
      }
      if (!state.lastname) {
        newErrors.lastname = 'Last name is required';
      }
    }

    return newErrors;
  }, [state.email, state.password, state.firstname, state.lastname, action]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const formErrors = validate();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }
      setErrors({});

      // Prepare payload with sanitized input values
      const payload = {
        email: sanitizeInput(state.email),
        password: sanitizeInput(state.password),
      };

      if (action === 'Sign Up') {
        payload.firstName = sanitizeInput(state.firstname);
        payload.lastName = sanitizeInput(state.lastname);
      }

      // const url =
      //   action === 'Sign In'
      //     ? 'http://localhost:8080/api/auth'
      //     : 'http://localhost:8080/api/users';

      //template literal used
      const url =
        action === 'Sign In'
          ? `${process.env.REACT_APP_BACKEND_URL}/api/auth`
          : `${process.env.REACT_APP_BACKEND_URL}/api/users`;

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Parse the error response
          console.error('Error details:', errorData);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setIsLoggedIn(true); // Set logged-in state
        console.log('Success:', data);

        if (action === 'Sign In' || action === 'Login') {
          setIsLoggedIn(true);
          navigate('/services'); // Redirect on successful login
        } else {
          console.log('Sign Up Successful', data);
        }

        onClose(); // Close the modal on success
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request. Please try again later.');
      }
    },
    [action, state, onClose, navigate, setIsLoggedIn, validate]
  );

  // Toggle between Sign In and Sign Up forms
  const toggleAction = useCallback(() => {
    setAction((prevAction) => (prevAction === 'Sign In' ? 'Sign Up' : 'Sign In'));
    dispatch({ type: 'RESET' }); // Reset form fields on action change
    setErrors({});
  }, []);

  // Disable background scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup when component unmounts or modal closes
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleForgotPassword = () => {
    onClose();
    setIsResetPasswordOpen(true);
  };
  

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-2 sm:p-6 md:p-8"
        className={classNames(
          'relative bg-white py-8 px-6 sm:px-10 md:px-14 lg:px-20 w-full max-w-lg lg:max-w-[550px] rounded-xl shadow-lg m-auto outline-none'
        )}
      >
        <h2 className="text-2xl font-bold text-black mb-4 text-center">{action}</h2>
        <p className="text-center text-gray-500 mb-8">Please enter your details</p>
        <form onSubmit={handleSubmit}>
          {action === 'Sign Up' && (
            <>
              <InputField
                label="First Name"
                type="text"
                icon="iconamoon:profile-thin"
                value={state.firstname}
                onChange={(e) => dispatch({ type: 'SET_FIRSTNAME', payload: e.target.value })}
                error={errors.firstname}
                placeholder="Enter your first name"
              />
              <InputField
                label="Last Name"
                type="text"
                icon="iconamoon:profile-thin"
                value={state.lastname}
                onChange={(e) => dispatch({ type: 'SET_LASTNAME', payload: e.target.value })}
                error={errors.lastname}
                placeholder="Enter your last name"
              />
            </>
          )}
          <InputField
            label="Email"
            type="email"
            icon="heroicons:envelope"
            value={state.email}
            onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
            error={errors.email}
            placeholder="onlyspeedstar@gmail.com"
          />
          <InputField
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            icon="mdi:key-outline"
            value={state.password}
            onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
            togglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
            error={errors.password}
            placeholder="Enter your password"
          />
          {action === 'Sign In' && (
            <div className="text-right mt-2">
              <button
                className="text-red-600 text-sm"
                onClick={handleForgotPassword}
              >
                Forgot password
              </button>
            </div>
          )}
          <button
            type="submit"
            className="bg-red-600 hover:bg-[#c32222] active:bg-red-700 text-white w-full py-2 rounded-lg my-6"
          >
            {action}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-2">
          {action === 'Sign In' ? "Don't" : 'Already'} have an account?
          <button onClick={toggleAction} className="text-red-600 ml-1">
            {action === 'Sign In' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
        <button
          className="absolute top-7 right-6 text-gray-400 hover:text-gray-800"
          onClick={onClose}
        >
          <Icon icon="material-symbols-light:close" className="h-7 w-7" />
        </button>
      </Modal>
      <PasswordResetModals 
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />
    </>
  );
};

export default LoginSignupModal;
