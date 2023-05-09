import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

const Nav = () => {
  const defaultStyle = {
    textDecoration: "none",
    fontSize: "20px",
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
      <NavLink to="/diary" style={style}>
        일기쓰기
      </NavLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: none;
  width: 250px;
  height: 90vh;
  border-right: 1px solid grey;
`;

export default Nav;
