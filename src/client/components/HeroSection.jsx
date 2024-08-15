import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from './BookButton';

const HeroSection = ({ title, description, description2, backgroundImage }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook to get the current route location
  const [scrollPosition, setScrollPosition] = useState(0); // State to track the scroll position

  useEffect(() => {
    // Handler for updating the scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll); // Listen for scroll events
    
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up event listener on unmount
    };
  }, []);

  const isHomePage = location.pathname === '/'; // Check if the current route is the homepage
  const isServices = location.pathname === '/services'; // Check if the current route is the services page

  // Navigate to the contact page when the "Talk To Us" button is clicked
  const handleTalkToUsClick = () => {
    navigate('/contact');
  };

  return (
    <section
      className={`bg-cover bg-center bg-black ${isHomePage || isServices ? 'h-screen' : 'h-[60vh]'} flex items-center`}
      style={{
        backgroundImage: `url(${backgroundImage})`, // Apply background image
        backgroundPositionY: `${scrollPosition * 0.5}px`, // Parallax effect on scroll
      }}
    >
      <div className="bg-black bg-opacity-10 w-full h-full flex items-center">
        <div className="text-white mx-4 md:ml-24 lg:ml-28 p-4 lg:p-8">
          <h1 className="text-[4rem] sm:text-8xl md:text-8xl lg:text-[12vw] font-[650] my-4 md:my-10 font-serif">
            {title}
          </h1>
          {/* Conditionally render descriptions and buttons on the homepage or services page */}
          {(isHomePage || isServices) && (
            <div className="text-left w-11/12 md:w-2/3 lg:w-2/5">
              <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-8">
                {description}
              </p>
              {description2 && (
                <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-8">
                  {description2}
                </p>
              )}
              <div className="flex flex-col md:flex-row">
                <Button
                  styleProp="border hover:border-red-700 hover:bg-red-700 w-full md:w-auto px-6 py-3 mb-4 md:mb-0 md:mr-4 rounded-xl text-sm md:text-lg transition duration-300"
                  textProp="Book A Schedule"
                />
                <button
                  className="border hover:bg-white hover:text-red-700 w-full md:w-auto px-6 py-3 rounded-xl text-sm md:text-lg transition duration-300"
                  onClick={handleTalkToUsClick}
                >
                  Talk To Us
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
