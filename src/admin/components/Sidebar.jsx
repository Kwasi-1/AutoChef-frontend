import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Logo from '../assets/client_logo_black_white.png';

// Sidebar component that displays navigation items
const Sidebar = () => {
  // List of navigation items with route paths, labels, and icons
  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: 'hugeicons:home-04' },
    { to: '/admin/booked-services', label: 'Invoice', icon: 'uil:invoice' },
    { to: '/admin/gallery', label: 'Gallery', icon: 'radix-icons:image' },
    { to: '/admin/services', label: 'Services', icon: 'heroicons:wrench-screwdriver' },
  ];

  return (
    <div className="fixed w-16 sm:w-20 lg:w-72 h-screen p-2 sm:p-4 border-r border-[#E8E9ED]">
      {/* Logo section */}
      <div className="flex items-center justify-center lg:justify-start mb-5">
        <img src={Logo} alt="AutoChef Logo" className='w-[40px] lg:w-[95px] h-[40px] lg:h-[74px]' />
      </div>

      {/* Navigation menu */}
      <nav>
        <ul>
          {/* Iterate over navItems to create navigation links */}
          {navItems.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/admin'} // Ensure `end` is applied only to the `/admin` route
                className={({ isActive }) =>
                  `flex items-center justify-center lg:justify-start p-2 lg:py-3 lg:px-4 rounded-xl hover:bg-[#FFE5E5] mb-3 hover:text-[#DE0000] ${
                    isActive ? 'text-white bg-[#DE0000]' : ''
                  }`
                }
              >
                {/* Icon for each nav item */}
                <Icon icon={icon} className="w-6 h-6" />
                {/* Label for each nav item, hidden on small screens */}
                <span className='hidden lg:inline-block ml-2'>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout link positioned at the bottom of the sidebar */}
      <Link to="/logout" className='absolute bottom-8 left-1/2 transform -translate-x-1/2 md:left-9 lg:transform-none flex items-center text-[#D90428]'>
        <Icon icon="ic:round-logout" className="w-7 h-7" />
        <span className='hidden lg:inline-block ml-2'>Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
