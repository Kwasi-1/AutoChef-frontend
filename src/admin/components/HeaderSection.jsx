import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const HeaderSection = ({ onExport }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggles the visibility of the export options dropdown
  const toggleDropdown = () => {
    setDropdownVisible(prevState => !prevState);
  };

  // Handles the export option selection
  const handleExportOption = (format) => {
    onExport(format); // Trigger the export function passed as a prop
    setDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      {/* Tabs Section */}
      <p className="text-[#DE0000] mb-4 sm:mb-0 border-b-2 border-[#DE0000] pb-1">
        All Invoice
      </p>

      {/* Export Button Section */}
      <div className="relative w-full sm:w-auto">
        <button 
          className="flex items-center border-2 border-red-400 text-[#DE0000] hover:bg-[#DE0000] hover:text-white py-2 px-3 rounded-lg w-full sm:w-auto"
          onClick={toggleDropdown} // Toggle dropdown visibility on button click
        >
          <Icon icon="pajamas:export" className="mr-2 w-5 h-5" />
          <span className="flex-1">Export as</span>
          <Icon icon="mingcute:down-line" className="ml-2 w-4 h-4" />
        </button>
        
        {/* Export Options Dropdown */}
        {dropdownVisible && (
          <div className="absolute right-0 z-20 mt-2 w-32 bg-white border rounded-lg shadow-lg p-1">
            <div
              onClick={() => handleExportOption('pdf')}
              className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              PDF
            </div>
            <div
              onClick={() => handleExportOption('excel')}
              className="block px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              Excel
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSection;
