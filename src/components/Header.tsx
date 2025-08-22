import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <HeaderWapper>
        <HomeButton to="/">Header</HomeButton>
      </HeaderWapper>
      <Outlet />
    </>
  );
};

export default Header;

const HeaderWapper = styled.header`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #c7c7c7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  margin: 0 auto;
  z-index: 1000;
`;

const HomeButton = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #007bff;
  }
`;
