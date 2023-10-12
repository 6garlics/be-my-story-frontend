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
        <EngText>토리</EngText>
        <KorText $color={colors.theme3}>TORI</KorText>
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
  /* border-bottom: 1px solid grey; */
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
  /* border: 1px solid white; */
`;

const Logo = styled.img`
  width: 26px;
  margin-left: 4px;
  margin-right: 14px;
  /* border: 1px solid white; */
`;

const EngText = styled.div`
  color: white;
  font-size: 42px;
  font-family: "Gaegu";
  /* border: 1px solid white; */
  padding-top: 10px;
`;

const KorText = styled.div`
  /* border: 1px solid white; */

  font-size: 16px;
  font-family: "Gaegu";
  color: white;
  /* color: ${({ $color }) => $color}; */
  margin-top: 18px;
  margin-left: 4px;
`;

export default Header;
