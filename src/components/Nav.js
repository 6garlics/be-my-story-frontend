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
  const defaultStyle = {
    color: "black",
    textDecoration: "none",
    fontSize: "18px",
    margin: "15px 0px",
    display: "flex",
    alignItems: "center",
  };
  const style = ({ isActive }) => {
    return isActive
      ? { ...defaultStyle, fontWeight: "bold" }
      : { ...defaultStyle, color: "grey" };
  };
  return (
    <Container>
      <NavLink to="/" style={style}>
        <Icon>
          <RiHome3Fill size={iconSize} />
        </Icon>
        타임라인
      </NavLink>
      <NavLink to="/diary-form" style={style}>
        <Icon>
          <RiAddCircleFill size={iconSize} />
        </Icon>
        일기쓰기
      </NavLink>
      <NavLink to="/bookshelf/0" style={style}>
        <Icon>
          <RiBook2Fill size={iconSize} />
        </Icon>
        내 책장
      </NavLink>
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

const Icon = styled.div`
  margin: 0px 12px -6px 13px;
`;

export default Nav;
