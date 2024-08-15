import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import serviceData from '../data/serviceData';
import locationIcon from '../assets/location.png';
import emailIcon from '../assets/email.png';
import phoneIcon from '../assets/phone.png';
import ContactInfo from './ContactInfo';
import SocialIcons from './SocialIcons';
import menuItems from '../data/menuItems';

// Footer component displays the footer section of the website
const Footer = () => {
  // Memoize service data to prevent re-rendering unless the data changes
  const services = useMemo(() => serviceData, []);

  return (
    <>
      {/* Container for contact information section */}
      <div className="relative container mx-auto">
        <div className="relative flex md:flex-row justify-around items-center bg-neutral-800 md:w-11/12 lg:w-4/5 py-4 md:py-8 lg:py-10 rounded-2xl mx-4 md:mx-auto text-white mb-8 top-16 md:top-24">
          {/* Contact Information using reusable component */}
          <ContactInfo href="https://maps.app.goo.gl/Kdr4PQ27nfd6ukvJ7" imgSrc={locationIcon} altText="Location">
            Achimota Mile 7
          </ContactInfo>
          <ContactInfo href="mailto:autochef83@gmail.com" imgSrc={emailIcon} altText="Email">
            theautochef83@gmail.com
          </ContactInfo>
          <ContactInfo href="tel:+233200666211" imgSrc={phoneIcon} altText="Phone">
            0200666211
          </ContactInfo>
        </div>
      </div>

      {/* Main footer section */}
      <footer className="bg-black text-white pb-2 pt-32 md:pt-40 lg:pt-44 px4 px-16 w-full">
        <div className="container mx-auto">
          <div className="flex flex-col flex-wrap sm:flex-row md:gap-8 text-center sm:text-left justify-between mb-16">
            {/* Logo and description */}
            <div className="w-full sm:w-1/2 md:w-2/5 mb-8 md:mb-0">
              <div className="text-2xl font-bold">
                <Link to="/">Auto<span className="text-red-700">Chef</span></Link>
              </div>
              <p className='w-full lg:w-3/4'>
                Using state-of-the-art technology, we undertake car wash and servicing of your machine.
                We know how much you value your vehicle.
              </p>
            </div>
            {/* Useful Links section */}
            <div className="mb-8 md:mb-0">
              <h3 className="font-bold mb-4">Useful Links</h3>
              <ul>
                {menuItems.map((item, index)=> (
                  <li key={index} className='mb-1'><Link to={item.path}>{item.label}</Link></li>
                ))}
              </ul>
            </div>
            {/* Our Services section */}
            <div className="mb-8 md:mb-0">
              <h3 className="font-bold mb-4">Our Services</h3>
              <ul>
                {services.map(service => (
                  <li key={service.title} className='mb-1'><Link to={`/services#${service.path}`}>{service.title}</Link></li>
                ))}
              </ul>
            </div>
            {/* Opening Hours section */}
            <div>
              <h3 className="font-bold mb-4">Opening Hours</h3>
              <ul>
                <li>Monday - Saturday</li>
                <li className='mb-3'>7:00 AM - 9:00 PM</li>
                <li>Sunday</li>
                <li>10:00 AM - 6:00 PM</li>
              </ul>
            </div>
          </div>

          {/* Footer bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t-[0.5px] text-gray-200 border-stone-600 py-4">
            <p className="text-center mb-4 md:mb-0">© 2024 AutoChef. All rights reserved.</p>
            <SocialIcons />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
