import React from "react";
import { useContext } from "react";
import { styled } from "styled-components";
import ColorContext from "../../contexts/Color";

const MailForm = ({ showMailForm, setShowMailForm }) => {
  const colors = useContext(ColorContext);

  return (
    <Root $hide={!showMailForm}>
      <Text>등장인물에게 편지 쓰기</Text>
      <ContentWrapper>
        <CloseButton onClick={() => setShowMailForm(false)}>X</CloseButton>
        <Content placeholder="예) 주인공에게" />
        <Button $background={colors.theme3}>보내기</Button>
      </ContentWrapper>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin-left: 30px;
  margin-right: auto;
  width: ${({ $hide }) => $hide && "0px"};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
`;

const Text = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 28px;
  text-align: center;
  padding-bottom: 10px;
  white-space: nowrap;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 3 / 4;
  background: rgba(255, 255, 255, 0.2);
  padding: 26px 30px;
  border-radius: 0.7vw;
  box-shadow: 10px 10px 60px 0px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.div`
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
`;

const Content = styled.textarea`
  background: none;
  border: none;
  resize: none;
  width: 100%;
  height: 90%;
  flex: 1;
  box-sizing: border-box;
  color: inherit;
  font-family: inherit;
  font-size: 22px;
  vertical-align: super;
  margin-top: 10px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  &:focus {
    outline: none;
  }

  /* 밑줄 */
  line-height: 34px;
  background-attachment: local;
  background-image: repeating-linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 33px,
    rgba(255, 255, 255, 0.2) 33px,
    rgba(255, 255, 255, 0.2) 34px,
    rgba(0, 0, 0, 0) 34px
  );

  //스크롤바 디자인
  &::-webkit-scrollbar {
    width: 16px;
    visibility: hidden;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(151, 161, 255, 0.5);
    border-radius: 10px;
    background-clip: padding-box;
    border: 4px solid transparent;
    &:hover {
      cursor: default;
    }
  }
  &::-webkit-scrollbar-track {
    visibility: hidden;
  }
`;

const Button = styled.div`
  margin-left: auto;
  margin-top: 22px;
  background: ${({ $background }) => $background};
  padding: 6px 12px;
  border-radius: 30px;
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export default MailForm;
