import { Icon } from '@iconify/react';

const PageHeader = ({ onSearch }) => {
  return (  
    <div className="flex flex-col md:flex-row justify-between mb-5 text-lg items-center">
      <h1 className="font-semibold mb-3 md:mb-0 text-center md:text-left">Invoice</h1>
      <div className="flex items-center border border-[#E8E9ED] bg-white py-2 px-3 rounded-lg text-[#6E7379] w-full md:w-auto">
        <Icon icon="charm:search" className="mr-2 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full md:w-80 focus:outline-none"
          onChange={(e) => onSearch(e.target.value)}  // Trigger onSearch when input changes
        />
      </div>
    </div>
  );
}
 
export default PageHeader;
