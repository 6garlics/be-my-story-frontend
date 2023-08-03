import React, { useState } from "react";
import { styled } from "styled-components";
import { register } from "../api/users";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onJoin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData));

    const data = await register(formData);
  };

  return (
    <Container>
      <Wrapper>
        <Text>{`Be My Story 회원가입`}</Text>
        <Form onSubmit={onJoin}>
          <Label htmlFor="userName">사용자 이름</Label>
          <Input
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <SignUpBtn type="submit">가입하기</SignUpBtn>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.div`
  padding: 30px;
  box-sizing: border-box;
  border-radius: 15px;
  border: 1px solid grey;
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
  width: 250px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  height: 25px;
  border-radius: 7px;
  margin-bottom: 15px;
  border: 1px solid grey;
`;

const SignUpBtn = styled.button`
  border: none;
  padding: 4px 7px;
  border-radius: 7px;
  background: #78b9ff;
  color: white;
  text-align: center;
  margin-left: auto;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default Register;
