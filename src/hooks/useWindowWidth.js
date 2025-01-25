'use client';
import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // State to store the window width
  const [width, setWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    setIsClient(true); // This ensures the hook is only run client-side

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (isClient) {
      // Set initial window width when the component mounts
      handleResize();

      // Add event listener for resize
      window.addEventListener('resize', handleResize);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isClient]); // Ensure effect runs when component is client-side

  return width;
};

export default useWindowWidth;
