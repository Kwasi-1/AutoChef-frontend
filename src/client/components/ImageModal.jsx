import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState, useRef } from 'react';

const ImageModal = ({ isOpen, image, onClose, onPrevious, onNext }) => {
  // State to track image loading and error status
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Refs to handle touch gestures and image loading
  const touchStartXRef = useRef(0);
  const imageRef = useRef(null);

  // Effect to disable background scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Effect to handle keyboard navigation and modal closing
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  // Effect to handle image loading and error handling
  useEffect(() => {
    if (!imageRef.current) return;

    const handleLoad = () => setIsLoading(false);
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    const img = imageRef.current;
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [image]);

  // Handle touch gestures for swipe navigation
  const handleTouchStart = (e) => {
    e.stopPropagation();
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    const touchEndX = e.changedTouches[0].clientX;

    if (touchStartXRef.current - touchEndX > 50) {
      onNext();
    } else if (touchStartXRef.current - touchEndX < -50) {
      onPrevious();
    }
  };

  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose} // Close modal on overlay click
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Button to navigate to the previous image */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        className="absolute group z-10 left-5 text-white text-2xl px-1 xl:px-5 py-5 md:py-20 2xl:py-32"
      >
        <Icon icon='teenyicons:left-outline' className='bg-gray-300 text-gray-800 group-hover:bg-gray-400 group-active:bg-gray-300 p-3 w-10 h-10 md:w-11 md:h-11 rounded-full transition duration-300'/>
      </button>

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* Error message or image */}
      {hasError ? (
        <div className="text-white text-2xl">Failed to load image</div>
      ) : (
        <img 
          ref={imageRef}
          src={image} 
          alt="Selected item" 
          className={`max-w-full h-full object-contain transition-transform duration-500 transform py-5 ${isLoading ? 'hidden' : ''}`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          loading="lazy"
        />
      )}

      {/* Button to navigate to the next image */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute group z-10 right-5 text-white text-2xl px-1 xl:px-5 py-5 md:py-20 2xl:py-32"
      >
        <Icon icon='teenyicons:right-outline' className='bg-gray-300 text-gray-800 group-hover:bg-gray-400 group-active:bg-gray-300 p-3 w-10 h-10 md:w-11 md:h-11 rounded-full transition duration-300'/>
      </button>

      {/* Button to close the modal */}
      <button
        className="absolute top-5 right-5 text-white text-2xl pl-3 pb-3"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
      >
        <Icon icon='formkit:close' className='w-7 h-7' />
      </button>
    </div>
  );
};

export default ImageModal;
