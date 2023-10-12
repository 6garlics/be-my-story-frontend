import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { bookSlice } from "../../redux/bookSlice";
import { useRef } from "react";
import { DotLoader } from "react-spinners";
import { current } from "@reduxjs/toolkit";

const PageEdit = ({
  positions,
  setPositions,
  //page,
  text,
  imgUrl,
  index,
  show,
}) => {
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.book.saved);
  const [newText, setNewText] = useState(text);
  const [textPos, setTextPos] = useState({ x: 0, y: 0 });
  const [focus, setFocus] = useState(false);
  const [percentX, setPercentX] = useState(0);
  const [percentY, setPercentY] = useState(0);

  const container = useRef(); //Container 참조
  const textarea = useRef(); //TextArea 참조
  const textWrapper = useRef(); //TextWrapper 참조
  const dragHandle = useRef(); //DragHandle 참조

  //포커스
  const onFocus = (e) => {
    setFocus(true);
  };

  //포커스해제
  const removeFocus = (e) => {
    if (
      document.activeElement !== textarea.current &&
      dragHandle.current !== e.target
    ) {
      // ref로 지정한 영역이 event.target을 포함하지 않았을 경우 코드 실행
      setFocus(false);
    }
  };

  //포커스해제 이벤트 핸들러 달기
  useEffect(() => {
    window.addEventListener("click", removeFocus);
  }, []);

  //TextArea의 높이 자동 조절 함수
  const fitHeight = () => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    textWrapper.current.style.height = textarea.current.scrollHeight + "px";
  };

  useEffect(() => {
    //TextArea의 높이 자동 조절
    fitHeight();
  }, [show]);

  useEffect(() => {
    setNewText(text);
  }, [text]);

  //textarea 내용 수정 시
  const handleChangeText = (e) => {
    setNewText(e.target.value);
    //표지라면 제목 수정
    if (index === 0) {
      dispatch(bookSlice.actions.setTitle(e.target.value));
    }
    //표지가 아닌 페이지라면 텍스트 수정
    else {
      dispatch(
        bookSlice.actions.setText({
          index: index - 1,
          text: e.target.value,
        })
      );
    }
    //TextArea의 높이 자동 조절
    fitHeight();
  };

  //퍼센트 좌표 업데이트
  useEffect(() => {
    const newPositions = positions;
    newPositions[index].x = percentX;
    newPositions[index].y = percentY;
    setPositions(newPositions);
  }, [textPos]);

  //픽셀 좌표 바인딩
  const bindTextPos = useDrag((params) => {
    setTextPos({ x: params.offset[0], y: params.offset[1] });
  });

  //퍼센트 좌표 계산
  useEffect(() => {
    let width =
      container.current &&
      Number(
        window
          .getComputedStyle(container.current)
          .getPropertyValue("width")
          .replace("px", "")
      );

    if (container.current && !isNaN(width)) {
      const x = (textPos.x / width) * 100;
      const y = (textPos.y / width) * 100;
      setPercentX(x >= 0 ? (x <= 90 ? x : 90) : 0);
      setPercentY(y >= 0 ? (y <= 90 ? y : 90) : 0);
    }
  });
  console.log(Math.floor(percentX), Math.floor(percentY));

  return (
    <Container $show={show} ref={container}>
      {imgUrl && imgUrl !== "" ? (
        <Image src={imgUrl} />
      ) : (
        <Loader>
          <DotLoader color="#78B9FF" size={100} />
        </Loader>
      )}
      <TextWrapper
        ref={textWrapper}
        $x={percentX}
        $y={percentY}
        $isCover={index === 0}
        $hideShadow={!imgUrl}
      >
        <DragHandle
          src="/icons/move.png"
          ref={dragHandle}
          {...bindTextPos()}
          $focus={focus}
        />
        <TextArea
          rows={1}
          ref={textarea}
          value={newText}
          onChange={handleChangeText}
          onFocus={onFocus}
          $focus={focus}
          $isCover={index === 0}
        ></TextArea>
      </TextWrapper>
      <PageNum>{index !== 0 && index}</PageNum>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: ${(props) => !props.$show && "none"};
  position: relative;
  width: 100%;
  /* height: 0px; */
  /* padding-bottom: 50%; */
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  border-radius: 1vw;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  background: grey;
  /* 이미지 드래그 막기 */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

const Loader = styled.div`
  width: 100%;
  position: absolute;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: grey;
`;

const TextWrapper = styled.div.attrs(({ $x, $y }) => ({
  style: {
    top: $y + "%",
    left: $x + "%",
  },
}))`
  width: ${({ $isCover }) => ($isCover ? "90%" : "50%")};
  position: absolute;
  /* 배경 그림자 */
  &::before {
    content: "";
    position: absolute;
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2.5vw;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.3);
    ${({ $hideShadow }) => $hideShadow && { display: "none" }}
  }
`;

const DragHandle = styled.img`
  ${(props) => !props.$focus && "display: none"};
  z-index: 1;
  position: absolute;
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 8px;
  padding: 2px;
  /* 이미지 드래그 막기 */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  &:hover {
    cursor: pointer;
  }
`;

const TextArea = styled.textarea`
  position: absolute;
  background: none;
  border: none;
  resize: none;
  box-sizing: border-box;
  color: white;
  width: 100%;
  padding: 1vw;
  font-size: 1.2vw;
  font-family: "Nanum Gothic";
  word-break: keep-all;
  border-radius: 2.5vw;
  overflow: hidden;
  ${(props) =>
    props.$isCover &&
    `padding: 0.5vw;
    font-size: 3.2vw;
    font-weight: bold;
    word-break: keep-all;
    text-align: center;
    font-family: Gaegu;
    border-radius: 5em;`};

  &:focus {
    /* outline: 1px solid white; */
  }
  ${(props) => (props.$focus ? "outline: 1px solid white" : "outline: none")};

  /* 우측하단의 크기조절 손잡이 숨기기 */
  &::-webkit-resizer {
    /* display: none; */
    pointer-events: none;
  }
`;

const PageNum = styled.div`
  color: white;
  text-align: center;
  position: absolute;
  bottom: 1px;
`;

// const RadioButton = styled.input`
//   display: none;
// `;

// const Label = styled.label``;

// const Fieldset = styled.fieldset`
//   display: flex;
//   border: none;
//   padding: 0;
// `;

// const SmallImage = styled.img`
//   width: 50px;
//   height: 50px;
//   margin: 10px 10px;
//   margin-top: 40px;
//   border-radius: 5px;
//   border: ${(props) => props.id === props.selectedImage && "5px solid #78B9FF"};
//   &:hover {
//     cursor: pointer;
//   }
// `;

export default PageEdit;
