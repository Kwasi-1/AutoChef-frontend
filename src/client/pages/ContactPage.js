import React, { useMemo } from 'react';
import SocialIcons from '../components/SocialIcons';

// Array containing contact information objects
const contactInfo = [
  { type: 'phone', value: '020 066 6211', link: 'tel:+233200666211', icon: '📞' },
  { type: 'email', value: 'theautochef83@gmail.com', link: 'mailto:autochef83@gmail.com', icon: '✉️' },
  { type: 'address', value: 'Achimota Mile 7,near Neoplan Ltd Gh', link: 'https://maps.app.goo.gl/Kdr4PQ27nfd6ukvJ7', icon: '📍' },
];

// Reusable class names for styling
const commonTextClasses = "text-black text-lg mb-4";
const commonLinkClasses = "inline-block mr-2";
const commonIconClasses = "inline-block hover:scale-125 transform duration-300";

const ContactPage = () => {
  // Memoized function to create contact information elements
  const contactElements = useMemo(() => (
    contactInfo.map((info, index) => (
      <div key={index} className={commonTextClasses}>
        <a href={info.link} className={commonLinkClasses}>
          <div className={commonIconClasses}>{info.icon}</div> {info.value}
        </a>
      </div>
    ))
  ), []);

  return (
    <div className="bg-white flex flex-col py-16 px-4 w-9/12 mx-auto">
      <h2 className="text-xl text-black font-bold mb-4">GOT A QUESTION?</h2>
      <h1 className="text-3xl text-black font-extrabold mb-8">GET IN TOUCH</h1>
      <p className="text-lg text-gray-700 mb-16">
        The team are ready to help with your enquiry. Please feel free to get in touch with any questions you may have on any of our services and someone from the team will endeavour to assist you.
      </p>
      <h3 className="text-2xl text-black font-semibold mb-8">FOLLOW US</h3>
      <div className='mb-8'>
        <SocialIcons />
      </div>
      {/* Render memoized contact elements */}
      <div>
        {contactElements}
      </div>
    </div>
  );
};

export default ContactPage;
