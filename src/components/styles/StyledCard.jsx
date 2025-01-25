import React from 'react';

export const Card = (props) => (
  <div
    className="bg-white shadow-md rounded-xl p-2 h-full w-full overflow-y-auto scrollbar-none"
    {...props}
  >
    {props.children}
  </div>
);
