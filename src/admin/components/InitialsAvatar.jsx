import React from 'react';

const getInitials = (name) => {
  const [firstName, lastName] = name.split(' ');
  return `${firstName[0]}${lastName[0]}`;
};

const getRandomColor = () => {
  const colors = [
    'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  ];
  const textColors = [
    'text-white', 'text-black', 'text-gray-200', 'text-gray-100',
  ];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  const textColor = textColors[Math.floor(Math.random() * textColors.length)];
  return { bgColor, textColor };
};

const InitialsAvatar = ({ name }) => {
  const { bgColor, textColor } = getRandomColor();
  const initials = getInitials(name);

  return (
    <div className={`w-10 h-10 p-2 rounded-full ${bgColor} flex items-center justify-center text-lg font-bold ${textColor}`}>
      {initials}
    </div>
  );
};

export default InitialsAvatar;
