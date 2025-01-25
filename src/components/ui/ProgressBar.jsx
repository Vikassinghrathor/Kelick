import React from 'react';

const ProgressBar = ({ progress = 0, color = 'green-500' }) => {
  const progressWidth = Math.min(progress, 100); // Ensure the progress does not go above 100%

  return (
    <div className={`w-full h-1 bg-gray-200 rounded-full`}>
      <div
        className={`bg-light-teal h-1 rounded-full`}
        style={{ width: `${progressWidth}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
