import React from 'react';

export const MainContainer = ({ children }) => (
  <div className="min-h-screen flex">{children}</div>
);

export const MainContentContainer = ({ children }) => (
  <div className="flex flex-col w-full h-screen overflow-y-hidden">
    {children}
  </div>
);

export const MainBodyContainer = ({ children }) => (
  <main className="mt-[95px] ml-0 lg:ml-[14rem] bg-[#f2f5f5] flex justify-center h-full w-full lg:w-[85%] overflow-x-hidden">
    {children}
  </main>
);

export const SideNavContainer = ({ isSideBarVisible, children }) => (
  <div
    className={`${
      isSideBarVisible ? 'flex' : 'hidden'
    } lg:flex bg-white lg:w-[14rem] lg:mt-0 p-4 h-[90%] lg:h-screen fixed lg:top-0 top-24 left-0 border-r border-gray-200 w-full sm:mt-[110px] z-20`}
  >
    {children}
  </div>
);

export const TopNavContainer = ({ children }) => (
  <header className="bg-white text-white lg:w-[85%] h-[95px] border-b border-gray-200 flex items-center p-1 pl-4 shadow-md fixed z-10 top-0 lg:left-[14rem] w-full left-0">
    {children}
  </header>
);
