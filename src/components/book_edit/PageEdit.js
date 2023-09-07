import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import { styled } from "styled-components";

const PageEdit = ({ page, index, show }) => {
  const [text, setText] = useState(page.text);
  const [textPos, setTextPos] = useState({ x: 0, y: 0 });

  const bindTextPos = useDrag((params) => {
    setTextPos({ x: params.offset[0], y: params.offset[1] });
  });

  useEffect(() => {
    setText(page.text);
  }, [page]);

  console.log("page", page);
  console.log("show", show);

  return (
    <Container $show={show}>
      <Image src={page.imgUrl} />
      <PageNum>{index && index + 1}</PageNum>
      {/* <TextWrapper> */}
      {/* <MoveHandle src="/icons/move.png" /> */}
      <TextArea
        {...bindTextPos()}
        $x={textPos.x}
        $y={textPos.y}
        value={text}
        onChange={(e) => setText(e.target.value)}
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

const TextArea = styled.textarea`
  position: absolute;
  top: ${(props) =>
    props.$y >= 0 ? (props.$y <= 250 ? props.$y + "px" : "250px") : "0px"};
  left: ${(props) =>
    props.$x >= 0 ? (props.$x <= 250 ? props.$x + "px" : "250px") : "0px"};
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
