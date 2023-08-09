import React, { useContext } from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import ColorContext from "./../../contexts/Color";

const Header = () => {
  const colors = useContext(ColorContext);
  return (
    <Container $background={colors.background}>
      <Logo to="/">
        <BE $color={colors.theme3}>BE</BE>
        <Text>MY STORY</Text>
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
  box-sizing: border-box;
  /* border-bottom: 1px solid grey; */
  position: fixed;
  width: 100%;
  z-index: 1;
  background: ${(props) => props.$background};
`;

const Logo = styled(NavLink)`
  display: flex;
  color: black;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
`;

const BE = styled.div`
  color: ${(props) => props.$color};
  margin-right: 13px;
`;

const Text = styled.div`
  color: white;
`;

export default Header;
