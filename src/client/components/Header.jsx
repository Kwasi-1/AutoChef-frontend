import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import LoginSignupModal from './LoginSignupModal';
import BookingHistoryModal from './BookingHistoryModal';
import LoginSignupButton from './LoginSignUpButton';
import Button from './BookButton';
import { Icon } from '@iconify/react';
import menuItems from '../data/menuItems';
import LogoutButton from './LogoutButton';
import ResetPasswordButton from './ResetPasswordButton';

const Header = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);  // Menu toggle
  const [bgColor, setBgColor] = useState('bg-transparent');  // Header background color
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // User dropdown toggle
  const [isModalOpen, setIsModalOpen] = useState(false);  // Login/signup modal toggle
  const [isBookingHistoryModalOpen, setIsBookingHistoryModalOpen] = useState(false);  // Booking history modal toggle
  
  // References for detecting outside clicks
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // Context and navigation hooks
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if current page is the booking page
  const isBooking = location.pathname === '/booking';

  // Toggle the menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scrolling to change header background color
  const handleScroll = () => setBgColor(window.scrollY > 50 ? 'bg-black' : 'bg-transparent');

  // Attach scroll event listener on mount, detach on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle the user dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle clicks outside the dropdown or menu to close them
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
      setIsOpen(false);
    }
  };

  // Attach document click listener on mount, detach on unmount
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle user icon click: open dropdown if logged in, otherwise show login/signup modal
  const handleUserIconClick = () => {
    isLoggedIn ? toggleDropdown() : setIsModalOpen(true);
  };

  // Handle cart icon click: open booking history modal if logged in, otherwise show login/signup modal
  const handleCartIconClick = () => {
    isLoggedIn ? openBookingHistoryModal() : setIsModalOpen(true);
  };

  // Modal open/close handlers
  const closeModal = () => setIsModalOpen(false);
  const closeBookingHistoryModal = () => setIsBookingHistoryModalOpen(false);
  const openBookingHistoryModal = () => setIsBookingHistoryModalOpen(true);

  return (
    <header className={`text-white ${isBooking ? 'bg-black' : bgColor } px-4 lg:px-16 py-4 fixed top-0 left-0 right-0 z-30 `}>
      <nav className="flex justify-between items-center">
        <div className='flex items-center'>
          {/* Menu Button */}
          <button onClick={toggleMenu} className="focus:outline-none mr-4 transition duration-300">
            {isOpen ? (
              <Icon icon='ic:round-close' className='h-6 w-6 transition-transform duration-300' />
            ) : (
              <div className='flex items-center'>
                <Icon icon='ic:outline-menu' className='h-6 w-6 lg:h-8 lg:w-8 transition-transform duration-300' />
                <h2 className='hover:text-red-500 ml-2 lg:ml-4 transition-colors duration-300'>Menu</h2>
              </div>
            )}
          </button>
          {/* Logo/Branding */}
          <Link to='/' className='hidden lg:block'>Welcome to the future of auto repair!</Link>
        </div>

        {/* Menu Items */}
        <ul ref={menuRef} className={`absolute top-full left-0 h-screen bg-black w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out pl-4 lg:pl-16`}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `hover:text-red-700 block w-fit py-2 md:py-3 lg:py-4 px-4 md:px-0 transition-colors duration-300 ${isActive ? 'text-red-700 font-bold' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User actions and icons */}
        <div className='flex'>
          <div className='flex items-center'>
            <div className='relative' ref={dropdownRef}>
              {/* User Icon */}
              <Icon
                icon='lets-icons:user-light'
                className='h-6 w-6 md:h-7 md:w-7 mr-2 lg:mr-3 hover:text-[#DE0000] transition-colors duration-300 cursor-pointer'
                onClick={handleUserIconClick}
              />
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-black bg-opacity-85 border border-gray-500 p-2 text-white rounded-lg shadow-lg transition-all duration-300'>
                  <button onClick={openBookingHistoryModal} className='flex items-center w-full text-left px-3 py-2 rounded-md border border-black hover:border-gray-400 active:text-[#DE0000] active:border-[#DE0000] transition duration-300'>
                    <Icon icon="mdi-light:cart" className="w-4 h-4 mr-3" />
                    Booking History
                  </button>
                  {/* Password Reset Button */}
                  <ResetPasswordButton
                    // onClick={handleReset} // Pass the reset function
                    text="Reset Password"
                    styleProp="w-full text-left px-3 py-2 rounded-md border border-black hover:border-gray-400 active:text-[#DE0000] active:border-[#DE0000] transition duration-300"
                  />
                  {/* Logout Button */}
                  <LogoutButton 
                    styleProp="w-full text-left px-3 py-2 rounded-md border border-black hover:border-gray-400 active:text-[#DE0000] active:border-[#DE0000] transition duration-300"
                    iconProp="w-4 h-4 mr-3"
                  /> 
                </div>
              )}
            </div>
            {/* Cart Icon */}
            <Icon 
              icon='mdi-light:cart' 
              className='h-6 w-6 md:h-7 md:w-7 mr-2 lg:mr-3 hover:text-[#DE0000] transition-colors duration-300 cursor-pointer'
              onClick={handleCartIconClick}
            />
            {/* Book Now Button */}
            <Button
              styleProp='hidden md:block pr-4 hover:text-[#DE0000] transition-colors duration-300'
              textProp='Book Now'
            />           
            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <Link to='/services' className='px-2 py-[7px] md:px-3 md:py-2 border rounded-lg lg:hidden border-gray-100 text-sm hover:text-red-700 transition-colors duration-300 hover:bg-white'>View Services</Link>
            ) : (
              <LoginSignupButton
                styleProp="px-2 py-[7px] md:px-3 md:py-2 hidden sm:block lg:hidden border-gray-400 text-sm hover:text-red-700 transition-colors duration-300 hover:bg-white"
                textProp="Sign In"
              />
            )}
          </div>

          {/* Desktop buttons for logged in and guest users */}
          <div className='hidden lg:flex items-center'>
            {isLoggedIn ? (
              <Link to='/services' className='px-3 py-2 border rounded-lg text-md font-semibold hover:text-red-700 transition-colors duration-300 hover:bg-white'>View Our Services</Link>
            ) : (
              <>
                <LoginSignupButton
                  styleProp="px-3 py-2 text-md mr-3 border-red-700 font-semibold  hover:text-white transition-colors duration-300 hover:bg-red-700"
                  textProp="Sign In"
                />
                <LoginSignupButton
                  styleProp="px-3 py-2 text-md font-semibold hover:border-red-700 hover:bg-red-700 transition-colors duration-300"
                  textProp="Sign Up"
                />
              </>
            )}
          </div>

          {/* Logo */}
          <NavLink to="/" className="flex items-center ml-3">
            <img 
              src={require('../assets/auto-chef-logo.png')} 
              alt="logo" 
              className="w-16 h-10"
            />
          </NavLink>
        </div>
      </nav>

      {/* Modals for login/signup and booking history */}
      <LoginSignupModal isOpen={isModalOpen} onClose={closeModal} />
      <BookingHistoryModal isOpen={isBookingHistoryModalOpen} onClose={closeBookingHistoryModal} />
    </header>
  );
};

export default Header;
