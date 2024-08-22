import React from 'react';
import { Icon } from '@iconify/react';

const ResetPasswordButton = ({ onClick, text = "Reset", styleProp = "", icon = "mdi:restart", iconProp }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${styleProp}`}
    >
      <Icon icon={icon} className={`w-4 h-4 mr-2 ${iconProp}`} />
      {text}
    </button>
  );
};

export default ResetPasswordButton;
