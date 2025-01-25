import React from 'react';
import { useRouter } from 'next/router';
import { ICONS } from '@/assets';
import {
  organizationsConst,
  sideBarManageConst,
  dashboardConst,
} from '@/constants/appConstants';
import { useAppContext } from '@/context/AppContext';
import { Icon, MenuItem } from '../ui/';
import { SideNavContainer } from '../styles/StyledContainers';
import AccountPanel from '../app/card/Profile';

const SideBar = () => {
  const router = useRouter();
  const { appContext: { isSideBarVisible = true } = {} } =
    useAppContext() || {};

  return (
    <SideNavContainer
      isSideBarVisible={isSideBarVisible}
      role="navigation"
      aria-label="Main Navigation"
    >
      <nav className="flex flex-col justify-between h-full min-w-full">
        <div>
          <div className="flex flex-row items-center mb-8">
            <Icon
              src={ICONS.KelickLogo}
              onClick={() => router.push('/')}
              width={28}
              height={7}
              alt="Kelick Logo"
            />
          </div>
          <MenuItem menuItems={dashboardConst} />

          <MenuItem
            title="ORGANIZATIONS"
            isExpendable
            menuItems={organizationsConst}
          />
          <MenuItem title="MANAGE" menuItems={sideBarManageConst} />
        </div>
        <AccountPanel />
      </nav>
    </SideNavContainer>
  );
};

export default React.memo(SideBar);
