import { Icon } from "@iconify/react";

const ArrowUpButton = ({ onClick, bgColor, iconStyle, borderStyle }) => {
  return ( 
    <button 
    onClick={onClick} 
    className={`p-2 h-fit border border-[#6E7786] rounded-full group-hover:scale-110 group-hover:rotate-12 hover:scale-110 hover:rotate-12 transition-transform duration-300 ${bgColor} ${borderStyle}`}>
      <Icon icon="tabler:arrow-up-right" className={`${iconStyle} text-[#6E7786] h-5 w-5`} />
    </button>
  );
}

export default ArrowUpButton;
