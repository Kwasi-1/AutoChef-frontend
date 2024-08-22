import React from 'react';

/**
 * SkeletonLoader component to render loading placeholders based on the layout and type.
 * @param {number} itemCount - Number of skeleton items to render. Default is 4.
 * @param {string} layout - Layout of the skeleton loader, can be 'horizontal'. Default is 'horizontal'.
 * @param {string} type - Type of skeleton loader, can be 'table', 'list', or 'gallery'.
 */
const SkeletonLoader = ({ itemCount = 4, layout = 'horizontal', type }) => {
  // Define class names for different skeleton types
  const itemClassNames = {
    table: 'flex justify-between items-center py-3 border-b px-4',
    list: 'flex items-center justify-between py-3 border-b',
    gallery: 'flex items-center justify-between py-3 border-b',
  };

  return (
    <div className="animate-pulse">
      {[...Array(itemCount)].map((_, index) => (
        <div key={index} className={itemClassNames[type]}>
          <div className="flex items-center space-x-3">
            {/* Conditional rendering for 'table' type skeleton */}
            {type === 'table' && (
              <div className="h-4 bg-gray-300 rounded w-32"></div>
            )}
            {/* Conditional rendering for 'list' type skeleton */}
            {type === 'list' && (
              <>
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col gap-[6px]">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>
              </>
            )}
            {/* Conditional rendering for 'gallery' type skeleton */}
            {type === 'gallery' && (
              <>
                <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
                <div className="flex flex-col gap-[6px]">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                </div>              
              </>
            )}
          </div>
          {/* Conditional rendering for horizontal layout */}
          {layout === 'horizontal' && type === 'table' && (
            <>
              <div className="h-4 bg-gray-300 rounded w-28"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-8 bg-gray-300 rounded-lg w-[89px]"></div>
            </>
          )}
          {layout === 'horizontal' && type === 'list' && (
            <div className="h-8 bg-gray-300 rounded-lg w-20"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
