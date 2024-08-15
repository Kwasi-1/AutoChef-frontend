import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServicesSection from '../components/ServiceSection';
import serviceData from '../data/serviceData';

const ServicesPage = () => {
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    // Scroll to the element if there's a hash in the URL
    const hash = location.hash.substring(1); // Remove the '#' from the hash
    if (hash) {
      const element = document.getElementById(hash); // Get the element by ID
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
      }
    }
  }, [location]); // Re-run the effect when the location changes

  return (
    <div>
      {/* Page title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center p-2 sm:p-4 md:p-6 lg:p-8 font-semibold items-center">
        Our Services
      </h2>
      {/* Map through serviceData to create service sections */}
      {serviceData.map((section, index) => (
        <ServicesSection
          key={index}
          id={section.path} // ID for the section, used for scrolling
          title={section.title} // Service title
          description={section.description} // Service description
          points={section.points} // Service points
          image={section.image} // Background image for the section
          icon={section.icon} // Icon for the service
          alignRight={index % 2 === 0} // Align right for even-indexed sections
        />
      ))}
    </div>
  );
};

export default ServicesPage;
