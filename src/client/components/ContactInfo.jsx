import React from 'react';

// ContactInfo component displays contact information with an icon
const ContactInfo = ({ href, imgSrc, altText, children }) => (
  <div className="flex items-center space-x-4 md:mb-0">
    <div className="bg-red-500 rounded-full p-2 2xl:p-[10px] hover:bg-red-600 hover:scale-110 transition-all duration-300">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={imgSrc} alt={altText} className="w-5 h-5 md:w-9 md:h-9" />
      </a>
    </div>
    <span className="hidden lg:block">{children}</span>
  </div>
);

export default ContactInfo;
