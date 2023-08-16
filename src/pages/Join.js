import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { join } from "../api/users";
import ColorContext from "../contexts/Color";

const Join = () => {
  //입력값
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //안내 메세지
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  //유효성
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const focusColor = useContext(ColorContext).theme3;
  const navigate = useNavigate();

  //회원가입 버튼 클릭 시
  const onJoin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData));

    const data = await join(formData);

    navigate("/login");
  };

  //이름 변경시
  const onChangeName = (e) => {
    const value = e.target.value;
    setUserName(value);

    if (value.length < 3 || value.length > 15) {
      setNameMessage("3글자 이상 15글자 미만으로 입력하세요.");
      setIsName(false);
    } else {
      setNameMessage("올바른 이름이에요.");
      setIsName(true);
    }
  };

  //이메일 변경시
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(value)) {
      setEmailMessage("올바르지 않은 이메일 형식이에요.");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일이에요.");
      setIsEmail(true);
    }
  };

  //비밀번호 변경시
  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegex.test(value)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요."
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("올바른 패스워드에요.");
      setIsPassword(true);
    }

    if (value !== passwordConfirm) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않아요.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치해요.");
      setIsPasswordConfirm(true);
    }
  };

  //비밀번호 확인 변경시
  const onChangePasswordConfirm = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);

    if (value !== password) {
      setPasswordConfirmMessage("비밀번호가 일치하지 않아요.");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치해요.");
      setIsPasswordConfirm(true);
    }
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
            onChange={onChangeName}
            $outline={focusColor}
          />
          <Message $color={isName ? "lightgreen" : "red"}>
            {userName.length > 0 && nameMessage}
          </Message>

          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
            $outline={focusColor}
          />
          <Message $color={isEmail ? "lightgreen" : "red"}>
            {email.length > 0 && emailMessage}
          </Message>

          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            $outline={focusColor}
          />
          <Message $color={isPassword ? "lightgreen" : "red"}>
            {password.length > 0 && passwordMessage}
          </Message>

          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
            $outline={focusColor}
          />
          <Message $color={isPasswordConfirm ? "lightgreen" : "red"}>
            {passwordConfirm.length > 0 && passwordConfirmMessage}
          </Message>
          <SignUpBtn
            type="submit"
            disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
          >
            가입하기
          </SignUpBtn>
        </Form>
      </Wrapper>
    </Container>
  );
};

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
  padding: 0 5px;
  border: 1px solid grey;
  &:focus {
    outline: ${(props) => `2px ${props.$outline} solid`};
  }
`;

const Message = styled.div`
  font-size: 12px;
  margin-bottom: 15px;
  height: 20px;
  color: ${(props) => props.$color};
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
  &:disabled {
    background: #aaaaaa;
    cursor: default;
  }
`;

export default Join;
