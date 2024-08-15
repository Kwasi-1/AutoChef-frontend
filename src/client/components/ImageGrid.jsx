import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

const ImageGrid = ({ images, onImageClick }) => {
  // Determine if the current page is the gallery page
  const location = useLocation();
  const isUserGallery = location.pathname === '/gallery';

  // Define the grid or column layout based on whether it's the gallery page
  const gridClass = isUserGallery
    ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-[3px] xl:gap-1"
    : "grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 w-[90%] gap-3 mx-auto";

  // Determine the image container classes based on the page
  const imageContainerClass = isUserGallery ? "rounded-lg mb-[2px] xl:mb-1" : "rounded-xl";

  return (
    <div className={classNames(gridClass, "p-[1px]")}>
      <TransitionGroup component={null}>
        {images.map((image, index) => (
          <CSSTransition
            key={index}
            timeout={300}
            classNames="fade"
          >
            <div
              className={classNames(imageContainerClass, "relative overflow-hidden")}
              onClick={() => onImageClick(index)}
            >
              <img
                src={image}
                alt={`Gallery item ${index + 1}`}
                className={classNames(
                  isUserGallery ? "h-full" : "h-52",
                  "w-full object-cover bg-slate-100 transition-transform duration-500 transform hover:scale-110 cursor-pointer"
                )}
                loading="lazy"
              />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ImageGrid;
