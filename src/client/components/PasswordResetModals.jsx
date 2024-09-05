import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { UserContext } from '../context/UserContext';
import { Icon } from '@iconify/react/dist/iconify.js';

const InputField = ({ label, type, icon, value, onChange, error, placeholder, PasswordMarginBottom, togglePassword }) => (
  <div className={PasswordMarginBottom ? 'mb-2' : 'mb-7'}>
    <label className="block font-semibold text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <Icon icon={icon} className="absolute left-3 top-4 w-5 h-5 text-stone-400" />
      <div className="absolute left-10 top-4 bottom-3 w-px h-5 bg-stone-200"></div>
      <input
        type={type}
        className={`w-full p-3 pl-14 pr-10 border border-stone-300 rounded-lg text-black outline-2 focus:outline focus:outline-red-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
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

const PasswordResetModals = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [code, setCode] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const { setIsLoggedIn } = useContext(UserContext);

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendCode = () => {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Logic to send the verification code to the email
    setEmailError('');
    setStep(2);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;

    // Create a copy of the code array
    const newCode = [...code];

    if (/^[0-9]$/.test(value)) {
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus on the next input field
      if (index < 5 && value) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }

      // If all inputs are filled, automatically verify the code
      if (index === 5 && newCode.every((digit) => digit !== '')) {
        handleVerifyCode(newCode);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const newCode = [...code];
      if (code[index] !== '') {
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        document.getElementById(`code-input-${index - 1}`).focus();
      }
    } else if (e.key === 'ArrowRight' && index < 5) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleVerifyCode = (enteredCodeArray) => {
    const enteredCode = enteredCodeArray.join('');
    // Logic to verify the code
    if (enteredCode === '123456') { // Replace with actual verification logic
      setStep(3);
    } else {
      alert('Invalid code');
    }
  };

  const handleResetPassword = () => {
    if (newPassword.length < 8) {
      setNewPasswordError('Password must be at least 8 characters long');
      return;
    } else if (newPassword.length > 24) {
      setNewPasswordError('Password must be at most 24 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setNewPasswordError('');

    // Logic to reset the password
    setIsLoggedIn(true);
    onClose(); // Close the modal after resetting the password
  };

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      className="relative bg-white py-8 px-6 sm:px-10 md:px-14 lg:px-20 max-w-lg lg:max-w-[550px] rounded-xl shadow-lg m-auto"
    >
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-black mb-1 text-center">Forgot Password</h2>
          <p className="text-center text-stone-400 px-10 mb-8">Enter your email to receive instructions to reset your password</p>
          <InputField
            label="Email"
            type="email"
            icon="heroicons:envelope"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            placeholder="onlyspeedstar@gmail.com"
          />
          <button
            onClick={handleSendCode}
            className="bg-red-600 hover:bg-[#c32222] active:bg-red-700 text-white w-full py-3 rounded-lg"
          >
            Reset password
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-black mb-4 text-center">Forgot Password</h2>
          <p className="text-center text-gray-500 mb-8">We sent a code to {email.replace(/(.{2})(.*)(@.*)/, "$1******$3")}</p>
          <div className="flex justify-center mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                className="text-center border rounded-lg p-3 text-2xl max-w-14 mx-1 outline-2 focus:outline focus:outline-red-500"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button
            onClick={handleSendCode}
            className="bg-red-600 hover:bg-[#c32222] active:bg-red-700 text-white w-full py-3 rounded-lg"
          >
            Resend
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-black mb-1 text-center">Set New Password</h2>
          <p className="text-center text-stone-400 mb-8">
            Your password must contain at least 8 characters, and include at least one uppercase letter, one lowercase letter, one number, and one special character.
          </p>
          <InputField
            label="New Password"
            type={isPasswordVisible ? 'text' : 'password'}
            icon="mdi:password-outline"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            togglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
            PasswordMarginBottom={true}
            error={newPasswordError}
          />
          <InputField
            label="Confirm Password"
            type={isConfirmPasswordVisible ? 'text' : 'password'}
            icon="mdi:password-outline"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            togglePassword={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
          />
          <button
            onClick={handleResetPassword}
            className="bg-red-600 hover:bg-[#c32222] active:bg-red-700 text-white w-full py-3 rounded-lg"
          >
            Save
          </button>
        </div>
      )}
      <button
        className="absolute top-7 right-5 text-gray-400 hover:text-gray-800"
        onClick={onClose}
      >
        <Icon icon="material-symbols-light:close" className="h-7 w-7" />
      </button>
    </Modal>
  );
};

export default PasswordResetModals;
