import React from "react";
import { styled } from "styled-components";

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Form>
          <Label htmlFor="id">ID</Label>
          <Id id="id" />
          <Label htmlFor="password">PASSWORD</Label>
          <Password id="password" />
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: beige;
`;

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid grey;
  width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid skyblue;
`;

const Label = styled.label``;

const Id = styled.input`
  width: 200px;
`;

const Password = styled.input`
  width: 200px;
`;

export default Register;
