import React, { useState } from 'react';
import Slider from 'react-slick';
import gallery from '../data/gallery';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ImageModal from './ImageModal';

const FeaturedGallery = () => {
  // State to keep track of the currently selected image index for the modal
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  // State to keep track of the center image index in the slider for custom styling
  const [centerIndex, setCenterIndex] = useState(0);

  // Select the first 6 images from the gallery to feature in the slider
  const featuredGallery = gallery.slice(0, 6);

  // Slider settings configuration
  const settings = {
    dots: true, // Enable navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2500, // Autoplay speed in milliseconds
    centerMode: true, // Enable center mode
    centerPadding: '0', // No padding around the centered slide
    arrows: false, // Disable navigation arrows
    customPaging: (i) => (
      // Custom styling for the navigation dots
      <div
        className={`w-full h-[6px] ${
          i === centerIndex ? 'bg-red-600' : 'bg-gray-200'
        } m-7 transition-colors duration-500 rounded`}
      ></div>
    ),
    dotsClass: 'slick-dots custom-dots', // Custom class for the navigation dots
    beforeChange: (oldIndex, newIndex) => setCenterIndex(newIndex), // Update center index before slide change

    // Responsive settings for different screen sizes
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides for screens <= 1024px
          slidesToScroll: 1, // Scroll 1 slide at a time
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 1 slide for screens <= 768px
          slidesToScroll: 1, // Scroll 1 slide at a time
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 slide for screens <= 480px
          slidesToScroll: 1, // Scroll 1 slide at a time
        },
      },
    ],
  };

  return (
    <div className="px-2 md:px-4 pt-10 pb-16">
      {/* Slider component for featured gallery */}
      <Slider {...settings}>
        {featuredGallery.map((image, index) => (
          <div key={index} className="px-2">
            <div className="relative bg-gray-300 overflow-hidden rounded-3xl">
              <img
                src={image}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-64 sm:h-80 2xl:h-[24vw] object-cover transition-transform duration-500 transform hover:scale-110 cursor-pointer"
                onClick={() => setSelectedIndex(index)} // Open modal on image click
                loading="lazy" // Lazy load images for performance optimization
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* Modal for displaying the selected image */}
      {selectedIndex !== null && (
        <ImageModal
          isOpen={selectedIndex !== null}
          image={gallery[selectedIndex]}
          onClose={() => setSelectedIndex(null)} // Close modal
          onPrevious={() => setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length)} // Show previous image
          onNext={() => setSelectedIndex((selectedIndex + 1) % gallery.length)} // Show next image
        />
      )}
    </div>
  );
};

export default FeaturedGallery;
