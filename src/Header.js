import React from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Container>
      <Logo to="/">
        <BE>BE</BE>MY STORY
      </Logo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex: none;
  height: 50px;
  padding: 5px;
  border-bottom: 1px solid grey;
  font-size: 30px;
  font-weight: bolder;
`;

const Logo = styled(NavLink)`
  display: flex;
  color: black;
  text-decoration: none;
`;

const BE = styled.div`
  color: #78b9ff;
  margin-right: 13px;
`;

export default Header;
