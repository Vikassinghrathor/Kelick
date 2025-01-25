import useWindowWidth from '@/hooks/useWindowWidth';
import React, { createContext, useState, useContext } from 'react';

// Step 1: Create the Context
const AppContext = createContext();

// Step 2: Create the Provider Component
export const AppContextProvider = ({ children }) => {
  const windowWidth = useWindowWidth();
  const [appContext, setAppContext] = useState({
    pageName: 'Employees',
    isSideBarVisible: windowWidth >= 1024,
    accountInfo: {
      userName: 'John Doe',
      email: 'johndoe@asure.pro',
    },
    topNav: {
      showAddEmployee: false,
    },
  });

  const setApplicationContext = (newContext) => {
    setAppContext((prev) => ({ ...prev, ...newContext }));
  };

  return (
    <AppContext.Provider value={{ appContext, setApplicationContext }}>
      {children}
    </AppContext.Provider>
  );
};

// Step 3: Create a custom hook to access context
export const useAppContext = () => {
  return useContext(AppContext);
};
