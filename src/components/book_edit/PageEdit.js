import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { bookSlice } from "../../redux/bookSlice";
import { useRef } from "react";
import { DotLoader } from "react-spinners";

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
  const [newText, setNewText] = useState(text);
  const [textPos, setTextPos] = useState({ x: 0, y: 0 });
  const [focus, setFocus] = useState(false);

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

  useEffect(() => {
    //TextArea의 높이 자동 조절 하기
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    textWrapper.current.style.height = textarea.current.scrollHeight + "px";
  }, [show]);

  //좌표 업데이트
  useEffect(() => {
    const newPositions = positions;
    newPositions[index].x = textPos.x;
    newPositions[index].y = textPos.y;
    setPositions(newPositions);
  }, [textPos]);

  const bindTextPos = useDrag((params) => {
    setTextPos({ x: params.offset[0], y: params.offset[1] });
  });

  useEffect(() => {
    setNewText(text);
  }, [text]);

  //textarea 수정시
  const handleChangeText = (e) => {
    setNewText(e.target.value);
    //표지라면 제목 수정
    if (index === 0) {
      dispatch(bookSlice.actions.setTitle(e.target.value));
    }
    //표지가 아닌 페이지라면 텍스트 수정
    else {
      dispatch(
        bookSlice.actions.setTexts({
          index: index - 1,
          text: e.target.value,
        })
      );
    }
    //TextArea의 높이 자동 조절 하기
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    textWrapper.current.style.height = textarea.current.scrollHeight + "px";
  };

  // console.log("page", page);
  // console.log("show", show);

  return (
    <Container $show={show}>
      {imgUrl && imgUrl !== "" ? (
        <Image src={imgUrl} />
      ) : (
        <Loader>
          <DotLoader color="#78B9FF" size={100} />
        </Loader>
      )}
      <TextWrapper ref={textWrapper} $x={textPos.x} $y={textPos.y}>
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
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  background: white;
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
  background: white;
`;

const TextWrapper = styled.div.attrs((props) => ({
  style: {
    top: props.$y >= 0 ? `${props.$y}px` : "0px",
    left: props.$x >= 0 ? `${props.$x}px` : "0px",
  },
}))`
  width: 50%;
  position: absolute;
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
  height: 0px;
  color: white;
  font-size: 15px;
  overflow: hidden;
  width: 100%;
  padding: 1.5vw;
  font-size: 1.2vw;
  ${(props) =>
    props.$isCover &&
    "font-size: 3.2vw;  font-weight: bold; word-break: keep-all; text-align: center; font-family: Gaegu;"};
  background: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 30px 25px rgba(0, 0, 0, 0.2);
  border-radius: 2em;

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
