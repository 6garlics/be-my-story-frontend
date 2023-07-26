import React, { useState } from "react";
import { styled } from "styled-components";

const Register = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Wrapper>
        <Text>{`Be My Story 회원가입`}</Text>
        <Form>
          <Label htmlFor="id">ID</Label>
          <Input
            id="id"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <Label htmlFor="password">PASSWORD</Label>
          <Input
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <SignUpBtn>가입하기</SignUpBtn>
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

const SignUpBtn = styled.div`
  padding: 4px 7px;
  border-radius: 7px;
  background: #78b9ff;
  color: white;
  text-align: center;
  margin-left: auto;
  margin-top: 10px;
`;

export default Register;
