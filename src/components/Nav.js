import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { HiHome, HiOutlineHome } from "react-icons/hi";

import { HiBookOpen, HiOutlineBookOpen } from "react-icons/hi2";

import { IoBookOutline, IoBookSharp } from "react-icons/io";
import {
  RiHome3Fill,
  RiHome3Line,
  RiAddCircleFill,
  RiAddCircleLine,
  RiBookFill,
  RiBoo2Line,
} from "react-icons/ri";

import { TbSquareRoundedPlusFilled, TbSquareRoundedPlus } from "react-icons/tb";
//import { BiSolidBook, BiBook } from "react-icons/bi";

const iconSize = 28;

const Nav = () => {
  return (
    <Container>
      <NLink to="/">
        <Icon>
          <HiHome size={iconSize} />
        </Icon>
        <Text>타임라인</Text>
      </NLink>
      <NLink to="/diary-form">
        <Icon>
          <TbSquareRoundedPlusFilled size={iconSize} />
        </Icon>
        <Text>일기쓰기</Text>
      </NLink>
      <NLink to="/bookshelf/0">
        <Icon>
          <HiBookOpen size={iconSize} />
        </Icon>
        <Text>내 책장</Text>
      </NLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: none;
  width: 250px;
  height: 100vh;
  height: auto;
  border-right: 1px solid grey;
  padding-top: 30px;
  /* 햄버거 버튼으로 접었다 폈다 할 수 있게 하면 좋을 듯 */
  /* 화면 가로 길이 좁아지면 자동으로 접히게 하면 좋을 듯 */
`;

const NLink = styled(NavLink)`
  display: flex;
  align-items: center;
  width: 150px;
  height: 35px;
  margin: 10px 13px;
  color: grey;
  text-decoration: none;
  font-size: 20px;
  &:hover {
  }
  &.active {
    font-weight: bold;
    color: black;
  }
`;

const Icon = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Text = styled.div`
  margin-left: 10px;
  flex: 3;
`;

export default Nav;
