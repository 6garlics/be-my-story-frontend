import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import {
  RiHome3Fill,
  RiHome3Line,
  RiAddCircleFill,
  RiAddCircleLine,
  RiBook2Fill,
  RiBook2Line,
} from "react-icons/ri";

const iconSize = 28;

const Nav = () => {
  const style = ({ isActive }) => {
    return isActive ? { fontWeight: "bold" } : { color: "grey" };
  };
  return (
    <Container>
      <NLink to="/" style={style}>
        <Icon>
          <RiHome3Fill size={iconSize} />
        </Icon>
        타임라인
      </NLink>
      <NLink to="/diary-form" style={style}>
        <Icon>
          <RiAddCircleFill size={iconSize} />
        </Icon>
        일기쓰기
      </NLink>
      <NLink to="/bookshelf/0" style={style}>
        <Icon>
          <RiBook2Fill size={iconSize} />
        </Icon>
        내 책장
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
  width: 140px;
  height: 35px;
  margin: 10px 0px;
  border-radius: 20px 20px 20px 20px;
  color: black;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    //background: lightgrey;
  }
`;

const Icon = styled.div`
  margin: 0px 12px -6px 13px;
`;

export default Nav;
