import React from 'react';
import InitialsAvatar from "./InitialsAvatar";

const Header = () => {
  const userName = "David Anderson"; // Admin's full name

  return (
    <div className="flex justify-between items-center py-4 px-6 bg-white my-6 border border-[#E8E9ED] rounded-lg">
      <div>
        <h1 className="text-xl font-semibold">Admin Central</h1>
        <p className="text-gray-500 hidden md:block">
          Monitor, manage, and maximize your auto shop's potential
        </p>
      </div>

      <div className="lg:flex items-center space-x-4 hidden">
        <div className="flex items-center space-x-2">
          <InitialsAvatar name={userName} /> {/* Pass the user name to the InitialsAvatar */}
          <div>
            <p className="text-sm font-semibold">{userName}</p>
            <p className="text-xs text-gray-500">markatta@codealpha.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
