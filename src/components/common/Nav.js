import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ColorContext from "../../contexts/Color";
import { logout } from "../../api/users";
import { isLogin } from "../../accessControl/isLogin";
import { useDispatch, useSelector } from "react-redux";
import home from "../../assets/home.svg";
import write from "../../assets/write.svg";
import bookshelf from "../../assets/bookshelf.svg";
import { bookSlice } from "../../redux/bookSlice";
import { userSlice } from "../../redux/userSlice";
import { timelineSlice } from "../../redux/timelineSlice";

const Nav = () => {
  const userName = useSelector((state) => state.user.userName);
  const colors = useContext(ColorContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = async () => {
    try {
      await logout({});
      localStorage.removeItem("beMyStoryToken");
      localStorage.removeItem("userName");
      localStorage.removeItem("bookshelfScroll");
      dispatch(bookSlice.actions.reset());
      dispatch(userSlice.actions.reset());
      dispatch(timelineSlice.actions.reset());
      navigate("/login");
    } catch (err) {}
  };

  return (
    <Container>
      {!isLogin() ? (
        <>
          <NLink to="/join" $activeColor={colors.theme3}>
            Join
          </NLink>
          <NLink to="/login" $activeColor={colors.theme3}>
            Login
          </NLink>
        </>
      ) : (
        <>
          <NLink to="/login" onClick={onLogout}>
            Logout
          </NLink>
          <NLink to="/" $activeColor={colors.theme3}>
            <Icon src={home} />
          </NLink>
          <NLink to="/diary-form" $activeColor={colors.theme3}>
            <Icon src={write} />
          </NLink>
          <NLink to={`/bookshelf/${userName}`} $activeColor={colors.theme3}>
            <Icon src={bookshelf} />
          </NLink>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const NLink = styled(NavLink)`
  //width: 20px;
  //height: 28px;
  display: flex;
  align-items: center;
  margin-left: 15px;
  color: rgba(255, 255, 255, 0.5);
  opacity: 0.5;
  &.active {
    opacity: 1;
    color: rgba(255, 255, 255, 1);
  }
`;

const Icon = styled.img``;

export default Nav;
