import { Icon } from '@iconify/react';
import React from 'react';
import ArrowUpButton from './ArrowUpButton';

const StatisticCard = ({
  iconBgColor,
  iconColor,
  count,
  title,
  arrowUpBgColor,
  isBookedServices,
  bgColor,
  onArrowClick,
}) => (
  <div className={`bg-white ${bgColor} p-4 border border-[#E8E9ED] rounded-lg group`}>
    {/* Conditionally render the icon if not on the booked services page */}
    {!isBookedServices && (
      <div
        className={`p-3 ${iconBgColor} w-fit mb-20 rounded-md group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon icon="gridicons:multiple-users" className={`h-6 w-6 ${iconColor}`} />
      </div>
    )}

    <div className="flex justify-between">
      {/* Display the count and title */}
      <div>
        <p className="text-lg md:text-xl font-semibold group-hover:text-white">{count}</p>
        <h2 className="text-[#6E7379] group-hover:text-white">{title}</h2>
      </div>

      {/* Conditionally render the arrow button if not on the booked services page */}
      {!isBookedServices && (
        <ArrowUpButton
          onClick={() => onArrowClick(title)}
          bgColor={arrowUpBgColor}
          borderStyle="border-none"
          iconStyle="text-white h-6 w-6"
        />
      )}
    </div>
  </div>
);

export default StatisticCard;
