import React, { useContext } from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import ColorContext from "./../../contexts/Color";
import logo from "../../assets/logo.svg";

const Header = () => {
  const colors = useContext(ColorContext);
  return (
    <Container $background={colors.background}>
      <Wrapper to="/">
        <Logo src={logo} />
        <LargeText>토리</LargeText>
        <SmallText>TORI</SmallText>
      </Wrapper>
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
  position: fixed;
  width: 100%;
  z-index: 1;
  background: ${(props) => props.$background};
`;

const Wrapper = styled(NavLink)`
  display: flex;
  align-items: center;
  color: black;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 26px;
  margin-left: 4px;
  margin-right: 14px;
`;

const LargeText = styled.div`
  color: white;
  font-size: 42px;
  font-family: "Gaegu";
  padding-top: 10px;
`;

const SmallText = styled.div`
  font-size: 16px;
  font-family: "Gaegu";
  color: white;
  margin-top: 18px;
  margin-left: 4px;
`;

export default Header;
