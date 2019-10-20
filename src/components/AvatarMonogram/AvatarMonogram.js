import React from 'react';
import 'styled-components/macro';

const getMonogramColor = (firstLetter = '') => {
  const charCode = firstLetter.charCodeAt(0);
  switch (charCode % 7) {
    case 1:
      return '#DB3737';
    case 2:
      return '#EB532D';
    case 3:
      return '#F2B824';
    case 4:
      return '#29A634';
    case 5:
      return '#2965CC';
    case 6:
      return '#7157D9';
    default:
      return '#A854A8';
  }
};

const AvatarMonogram = ({ name = '' }) => {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div
      css={`
        width: 50px;
        height: 50px;
        background-color: ${getMonogramColor(firstLetter)};
        text-align: center;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1),
          0 1px 1px rgba(16, 22, 26, 0.2), 0 2px 6px rgba(16, 22, 26, 0.2);
      `}
    >
      <span
        css={`
          position: relative;
          top: 25%;
          font-size: 25px;
          line-height: 25px;
          color: #fff;
          font-weight: bold;
        `}
      >
        {firstLetter}
      </span>
    </div>
  );
};

export default AvatarMonogram;
