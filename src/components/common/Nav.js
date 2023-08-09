import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { TbSquareRoundedPlusFilled, TbSquareRoundedPlus } from "react-icons/tb";
import { HiBookOpen, HiOutlineBookOpen } from "react-icons/hi2";
import ColorContext from "../../contexts/Color";

const iconSize = 28;

const Nav = () => {
  const colors = useContext(ColorContext);
  return (
    <Container>
      <NLink to="/join" $activeColor={colors.theme3}>
        Join
      </NLink>
      <NLink to="/login" $activeColor={colors.theme3}>
        Login
      </NLink>
      <NLink to="/" $activeColor={colors.theme3}>
        <HiHome size={iconSize} />
      </NLink>
      <NLink to="/diary-form" $activeColor={colors.theme3}>
        <TbSquareRoundedPlusFilled size={iconSize} />
      </NLink>
      <NLink to="/bookshelf/0" $activeColor={colors.theme3}>
        <HiBookOpen size={iconSize} />
      </NLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const NLink = styled(NavLink)`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  color: grey;
  &.active {
    color: ${(props) => props.$activeColor};
  }
`;

export default Nav;
