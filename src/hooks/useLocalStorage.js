import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get data from localStorage when the component mounts
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;

  // Use state with the parsed value or initialValue if not present
  const [value, setValue] = useState(parsedValue);

  // Update localStorage whenever the state changes
  const setLocalStorageValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setLocalStorageValue];
};

export default useLocalStorage;
