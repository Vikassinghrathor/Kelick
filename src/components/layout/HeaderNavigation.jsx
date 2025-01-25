import React from 'react';
import HamburgerIcon from '@/assets/icons/Hamburger_icon.svg';
import { ICONS } from '@/assets';
import { TopNavContainer } from '../styles/StyledContainers';
import { useAppContext } from '@/context/AppContext';
import { Button, Text, Icon } from '../ui';

const TopNav = () => {
  const {
    appContext: {
      pageName,
      isSideBarVisible,
      topNav: { showAddEmployee },
    } = {},
    setApplicationContext,
  } = useAppContext() || {};

  const handleHamburgerIconClick = () => {
    setApplicationContext({ isSideBarVisible: !isSideBarVisible });
  };

  return (
    <TopNavContainer role="banner">
      <div className="flex flex-col w-full lg:flex-row lg:justify-between items-center px-4">
        <div className="flex items-center gap-10 lg:gap-0 lg:justify-between w-full lg:w-auto text-black-100 text-3xl font-semibold leading-9 font-inter">
          <div className="flex lg:hidden">
            <Icon
              height="14px"
              width="18px"
              priority
              onClick={handleHamburgerIconClick}
              src={HamburgerIcon}
            />
          </div>
          <Text className="text-dark-gray font-quicksand font-bold text-3xl leading-10 tracking-tight">
            {pageName}
          </Text>
        </div>
        {showAddEmployee && (
          <Button
            iconStart={ICONS.AddEmployee}
            altIcon="bulk upload"
            className="items-center flex justify-around w-44 rounded-xl bg-light-teal border-light-gray-200 border-[1px] px-4 py-2 self-end lg:self-baseline"
            aria-label="Bulk Upload button"
          >
            Add Employee
          </Button>
        )}
      </div>
    </TopNavContainer>
  );
};

export default React.memo(TopNav);
