import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const Nav = () => {
  const defaultStyle = {
    textDecoration: "none",
    fontSize: "20px",
    margin: "5px 0px",
  };
  const style = ({ isActive }) => {
    return isActive
      ? { ...defaultStyle, color: "black", fontWeight: "bold" }
      : { ...defaultStyle, color: "grey" };
  };
  return (
    <Container>
      <NavLink to="/" style={style}>
        타임라인
      </NavLink>
      <NavLink to="/diary-form" style={style}>
        일기쓰기
      </NavLink>
      <NavLink to="/my-bookshelf" style={style}>
        내 책장
      </NavLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: none;
  width: 100px;
  height: auto;
  border-right: 1px solid grey;
  padding-top: 30px;
  /* border-right가 화면 세로 길이만큼 되도록 수정해야 함. */
  /* 햄버거 버튼으로 접었다 폈다 할 수 있게 하면 좋을 듯 */
  /* 화면 가로 길이 좁아지면 자동으로 접히게 하면 좋을 듯 */
`;

export default Nav;
