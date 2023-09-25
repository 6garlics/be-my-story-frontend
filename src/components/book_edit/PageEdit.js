import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { bookSlice } from "../../redux/bookSlice";

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
  };

  // console.log("page", page);
  // console.log("show", show);

  return (
    <Container $show={show}>
      <Image src={imgUrl} />
      <PageNum>{index !== 0 && index}</PageNum>
      {/* <TextWrapper> */}
      {/* <MoveHandle src="/icons/move.png" /> */}
      <TextArea
        {...bindTextPos()}
        $x={textPos.x}
        $y={textPos.y}
        value={newText}
        onChange={handleChangeText}
      ></TextArea>
      {/* </TextWrapper> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: ${(props) => !props.$show && "none"};
  position: relative;
  width: 300px;
  height: 0px;
  padding-bottom: 300px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
  position: absolute;
  /* 이미지 드래그 막기 */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

const TextWrapper = styled.div`
  position: absolute;
  border: 1px solid blue;
  padding: 20px;
`;

const MoveHandle = styled.img`
  width: 20px;
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

const TextArea = styled.textarea.attrs((props) => ({
  style: {
    top: props.$y >= 0 ? (props.$y <= 250 ? props.$y + "px" : "250px") : "0px",
    left: props.$x >= 0 ? (props.$x <= 250 ? props.$x + "px" : "250px") : "0px",
  },
}))`
  position: absolute;
  background: none;
  border: none;
  color: white;
  padding: 5px;
  /* resize: none; */
  font-size: 15px;
  border-radius: 10px;
  overflow: hidden;

  &:focus {
    outline: none;
    outline: 1px solid white;
    &::before {
      content: "와";
    }
  }
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
