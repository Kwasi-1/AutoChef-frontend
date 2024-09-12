import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServicesSection from '../components/ServiceSection';
import staticServiceData from '../data/staticServiceData';

// Default image and icon for unmatched services
const defaultService = {
  image: require('../assets/DetailingBg.jpg'),
  icon: 'mdi:alert-circle-outline',
};

const placeholderData = [
  {
    title: "Car Detailing",
    description: "Full interior and exterior car detailing to make your vehicle look like new.",
    points: ["Exterior wash", "Interior vacuum", "Polishing", "Waxing"],
    path: "car-detailing"
  },
  {
    title: "Auto Repair",
    description: "Comprehensive auto repair services for all vehicle types.",
    points: ["Engine diagnostics", "Brake replacement", "Transmission service", "Suspension work"],
    path: "auto-repair"
  },
  {
    title: "Oil Change",
    description: "Quick and affordable oil change services to keep your engine running smoothly.",
    points: ["Synthetic oil", "Filter replacement", "Fluid top-up", "Multi-point inspection"],
    path: "oil-change"
  }
];

const ServicesPage = () => {
  // State for storing services data, loading status, and error messages
  const [services, setServices] = useState(() => {
    const cachedServices = localStorage.getItem('services');
    return cachedServices ? JSON.parse(cachedServices) : placeholderData;
  });
  const [loading, setLoading] = useState(!services.length); // Show loading if no cached data
  const [error, setError] = useState(null);
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    // Function to fetch services data with retry logic
    const fetchServices = async (retryCount = 3) => {
      try {
        const response = await fetch('https://api.example.com/services'); // Replace with your API URL
        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.statusText}`);
        }
        const data = await response.json();
        setServices(data);
        localStorage.setItem('services', JSON.stringify(data)); // Cache data in localStorage
      } catch (error) {
        if (retryCount > 0) {
          console.warn(`Retrying fetch services, attempts left: ${retryCount}`);
          fetchServices(retryCount - 1); // Retry the fetch request
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // Fetch services if no cached data exists
    if (!services.length) {
      fetchServices();
    }
  }, [services.length]);

  useEffect(() => {
    // Scroll to the section if a hash is present in the URL
    const hash = location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return (
      <div className="text-center pt-5">
        <p>Error loading services: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center p-2 sm:p-4 md:p-6 lg:p-8 font-semibold items-center">
        Our Services
      </h2>
      {services.map((section, index) => {
        // Find matching static service
        const matchedService = staticServiceData.find(
          (staticService) => staticService.title === section.title
        );

        // Use matched service's image and icon, or default if no match
        const image = matchedService ? matchedService.image : defaultService.image;
        const icon = matchedService ? matchedService.icon : defaultService.icon;

        return (
          <ServicesSection
            key={index}
            id={section.path} // Use path as section ID for scroll linking
            title={section.title} // Service title
            description={section.description} // Service description
            points={section.points} // List of merged points (title + text)
            image={image} // Background image for the section
            icon={icon} // Icon representing the service
            alignRight={index % 2 === 0} // Alternating alignment
          />
        );
      })}
    </div>
  );
};

export default ServicesPage;