import React from 'react';

const Divider = ({ className = '' }) => {
  return <hr className={`border-t border-gray-300 my-2 ${className}`} />;
};

export default Divider;
