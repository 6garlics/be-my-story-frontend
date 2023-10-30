import React from "react";
import { styled } from "styled-components";
import plusCircle from "../../assets/plusCircle.svg";
import { useDispatch } from "react-redux";
import { bookSlice } from "../../redux/bookSlice";

const SequelPage = ({ show }) => {
  const dispatch = useDispatch();

  // 뒷이야기 페이지 추가
  const onAddPage = () => {
    dispatch(bookSlice.actions.addPage());
  };

  return (
    <Root $show={show}>
      <PlusIcon src={plusCircle} onClick={onAddPage} />
      <SequelText>뒷이야기 이어쓰기</SequelText>
    </Root>
  );
};

export default SequelPage;

const Root = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: rgba(255, 255, 255, 0.15);
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
