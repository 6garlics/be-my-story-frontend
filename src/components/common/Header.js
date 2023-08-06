import React from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {
  return (
    <Container>
      <Logo to="/">
        <BE>BE</BE>MY STORY
      </Logo>
      <Nav />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 15px;
  border-bottom: 1px solid lightgrey;
`;

const Logo = styled(NavLink)`
  display: flex;
  color: black;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
`;

const BE = styled.div`
  color: #78b9ff;
  margin-right: 13px;
`;

export default Header;
