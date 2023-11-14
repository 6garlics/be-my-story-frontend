import React from "react";
import { styled } from "styled-components";
import plusCircle from "../../assets/plusCircle.svg";
import { useDispatch } from "react-redux";
import { bookSlice } from "../../redux/bookSlice";

const SequelPage = ({ show, setPositions }) => {
  const dispatch = useDispatch();

  // 뒷이야기 페이지 추가
  const onAddPage = () => {
    dispatch(bookSlice.actions.addPage());
    setPositions((prev) => [...prev, { x: 0, y: 0 }]);
  };

  return (
    <Root $show={show}>
      <Container>
        <PlusIcon src={plusCircle} onClick={onAddPage} />
        <SequelText>뒷이야기 이어쓰기</SequelText>
      </Container>
    </Root>
  );
};

export default SequelPage;

const Root = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => !props.$show && "0px"};
  margin-bottom: ${(props) => (!props.$show ? "0px" : "46px")};
  overflow: hidden;
`;

const Container = styled.div`
  margin-top: 42px;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: rgba(255, 255, 255, 0.15);
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
