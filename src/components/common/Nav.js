import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { TbSquareRoundedPlusFilled, TbSquareRoundedPlus } from "react-icons/tb";
import { HiBookOpen, HiOutlineBookOpen } from "react-icons/hi2";

const iconSize = 28;

const Nav = () => {
  return (
    <Container>
      <NLink to="/">
        <HiHome size={iconSize} />
      </NLink>
      <NLink to="/diary-form">
        <TbSquareRoundedPlusFilled size={iconSize} />
      </NLink>
      <NLink to="/bookshelf/0">
        <HiBookOpen size={iconSize} />
      </NLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
  margin-left: auto;
`;

const NLink = styled(NavLink)`
  width: 28px;
  height: 28px;
  /* border: 1px solid blue; */
  display: flex;
  align-items: center;
  margin-left: 15px;
  color: grey;
  &.active {
    color: black;
  }
`;

export default Nav;
