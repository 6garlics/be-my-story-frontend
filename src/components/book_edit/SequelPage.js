import React from "react";
import { styled } from "styled-components";
import plusCircle from "../../assets/plusCircle.svg";

const SequelPage = ({ show }) => {
  return (
    <Root $show={show}>
      <PlusIcon src={plusCircle} />
      <SequelText>뒷이야기 이어쓰기</SequelText>
    </Root>
  );
};

export default SequelPage;

const Root = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: rgba(255, 255, 255, 0.3);
  height: ${(props) => !props.$show && "0px"};
  overflow: hidden;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PlusIcon = styled.img`
  margin-top: 34px;
  width: 60px;
  &:hover {
    cursor: pointer;
  }
`;

const SequelText = styled.div`
  font-size: 22px;
  margin-top: 10px;
`;
