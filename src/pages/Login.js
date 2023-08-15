import React, { useState, useContext } from "react";
import { styled } from "styled-components";
import { login } from "../api/users";
import ColorContext from "../contexts/Color";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const focusColor = useContext(ColorContext).theme3;
  const navigate = useNavigate();

  //로그인 버튼 클릭 시
  const onLogin = async (event) => {
    event.preventDefault();

    if (userName && password) {
      const formData = new FormData(event.target);
      console.log(Object.fromEntries(formData));
      try {
        const data = await login(formData);
        navigate("/");
      } catch (err) {
        if (err.response.status === 401) setMessage("비밀번호가 틀렸어요.");
        else if (err.response.status === 404)
          setMessage("존재하지 않는 사용자명이에요.");
        else setMessage("로그인에 실패했어요.");
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Text>{`Be My Story 로그인`}</Text>
        <Form onSubmit={onLogin}>
          <Label htmlFor="userName">사용자 이름</Label>
          <Input
            id="userName"
            name="userName"
            value={userName}
            $outline={focusColor}
            onChange={(e) => {
              setUserName(e.target.value);
              setMessage("");
            }}
          />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            $outline={focusColor}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage("");
            }}
          />
          <Footer>
            <Message>{message}</Message>
            <SignUpBtn type="submit">로그인</SignUpBtn>
          </Footer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(90vh - 60px);
`;

const Wrapper = styled.div`
  padding: 30px;
  box-sizing: border-box;
  border-radius: 15px;
  /* border: 1px solid grey; */
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  font-size: 27px;
  margin-bottom: 20px;
  text-align: center;
  width: 250px;
  word-break: keep-all;
`;

const Form = styled.form`
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  height: 30px;
  border-radius: 9px;
  margin-bottom: 15px;
  border: 1px solid grey;
  &:focus {
    outline: ${(props) => `2px ${props.$outline} solid`};
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: end;
`;

const Message = styled.div`
  font-size: 12px;
  color: red;
`;

const SignUpBtn = styled.button`
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  background: #78b9ff;
  color: white;
  text-align: center;
  margin-left: auto;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;
