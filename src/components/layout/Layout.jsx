import React from "react";
import {
  MainBodyContainer,
  MainContainer,
  MainContentContainer,
} from "../styles/StyledContainers";
import SideBar from "./SideBar";
import TopNav from "./HeaderNavigation";

const Layout = ({ children }) => {
  return (
    <MainContainer>
      {/* Side Navigation */}
      <SideBar />

      {/* Main Content */}
      <MainContentContainer>
        <TopNav />
        <MainBodyContainer>{children}</MainBodyContainer>
      </MainContentContainer>
    </MainContainer>
  );
};

export default React.memo(Layout);
