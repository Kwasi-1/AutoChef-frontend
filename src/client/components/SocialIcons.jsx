import React from 'react';
import { FaInstagram, FaSnapchatGhost, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// Array containing social media icons with their respective links and unique keys
const socialMediaIcons = [
  { Icon: FaInstagram, key: 'instagram', link: 'https://instagram.com/autochef_gh' },
  { Icon: FaXTwitter, key: 'twitter', link: 'https://twitter.com/autochef_gh' },
  { Icon: FaSnapchatGhost, key: 'snapchat', link: 'https://snapchat.com/add/am_oreen' },
  { Icon: FaTiktok, key: 'tiktok', link: 'https://tiktok.com/@autochef_gh' },
];

// SocialIcons component to render social media icons with links
const SocialIcons = () => {
  return (
    <div className="flex space-x-4">
      {socialMediaIcons.map(({ Icon, key, link }) => (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          key={key} // Unique key for each icon
          aria-label={key} // Accessibility improvement: Adds label for screen readers
        >
          <Icon 
            className="text-2xl cursor-pointer hover:text-red-600 hover:scale-110 transition duration-300" 
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
