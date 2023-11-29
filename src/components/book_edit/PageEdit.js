import React, { useState, useEffect } from "react";
import { useDrag } from "react-use-gesture";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import {
  bookSlice,
  thunkCreateCover,
  thunkCreateImage,
} from "../../redux/bookSlice";
import { useRef } from "react";
import { DotLoader } from "react-spinners";
import { useContext } from "react";
import ColorContext from "../../contexts/Color";

//요소 가로길이 구하는 함수
export const getWidth = (component) =>
  component.current &&
  Number(
    window
      .getComputedStyle(component.current)
      .getPropertyValue("width")
      .replace("px", "")
  );

const PageEdit = ({
  positions,
  setPositions,
  page,
  index,
  show,
  title,
  texts,
}) => {
  //상태
  const [newText, setNewText] = useState(page.text);
  const [focus, setFocus] = useState(false);
  const [percentX, setPercentX] = useState(0);
  const [percentY, setPercentY] = useState(0);
  const [textPos, setTextPos] = useState({ x: 0, y: 0 });
  const [imageStatus, setImageStatus] = useState("show"); //show: 이미지, loading: 로딩 아이콘, blank: 뒷이야기 이어쓰기

  //레퍼런스
  const container = useRef(); //Container 참조
  const textarea = useRef(); //TextArea 참조
  const textWrapper = useRef(); //TextWrapper 참조
  const dragHandle = useRef(); //DragHandle 참조
  const dispatch = useDispatch();
  const colors = useContext(ColorContext);

  //TextArea 포커스 핸들러
  const onFocus = (e) => {
    setFocus(true);
  };

  //TextArea 포커스해제 핸들러
  const removeFocus = (e) => {
    if (
      document.activeElement !== textarea.current &&
      dragHandle.current !== e.target
    ) {
      // ref로 지정한 영역이 event.target을 포함하지 않았을 경우 코드 실행
      setFocus(false);
    }
  };

  //TextArea 포커스해제 핸들러 달기
  useEffect(() => {
    window.addEventListener("click", removeFocus);
  }, []);

  //TextArea의 높이 자동 조절 함수
  const fitHeight = () => {
    textarea.current.style.height = "auto";
    textarea.current.style.height = textarea.current.scrollHeight + "px";
    textWrapper.current.style.height = textarea.current.scrollHeight + "px";
  };

  //초기 TextArea의 높이 자동 조절
  useEffect(() => {
    fitHeight();
  }, [show]);

  //초기 text 설정
  useEffect(() => {
    setNewText(page.text);
  }, [page.text]);

  //textarea 내용 수정 핸들러
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
  }, [textPos, percentX, percentY, index, positions, setPositions]);

  //픽셀 좌표 바인딩
  const bindTextPos = useDrag((params) => {
    setTextPos({ x: params.offset[0], y: params.offset[1] });
  });

  //초기 픽셀 좌표 계산
  useEffect(() => {
    const width = getWidth(container);
    if (!isNaN(width)) {
      setTextPos({
        x: (page.x * width) / 100,
        y: (page.y * width) / 100,
      });
    }
  }, [page.x, page.y]);

  //퍼센트 좌표 계산
  useEffect(() => {
    const width = getWidth(container);

    if (container.current && !isNaN(width)) {
      const x = (textPos.x / width) * 100;
      const y = (textPos.y / width) * 100;
      setPercentX(x >= 0 ? (x <= 90 ? x : 90) : 0);
      setPercentY(y >= 0 ? (y <= 90 ? y : 90) : 0);
    }
  }, [textPos]);

  // 이미지 요청 취소 컨트롤러
  let abortController = useRef();
  useEffect(() => {
    abortController.current = new AbortController();
  }, []);

  //이미지 생성/취소 핸들러
  const onCreateImage = () => {
    // 이미 생성 중이라면 요청 취소
    if (imageStatus === "loading") {
      abortController.current.abort();
      abortController.current = new AbortController();
      page.imgUrl !== "blank"
        ? setImageStatus("show")
        : setImageStatus("blank");
    } else {
      if (index === 0) {
        // 표지 생성 요청
        console.log("표지 생성 요청");
        dispatch(
          thunkCreateCover({
            body: { title: title, texts: texts },
            signal: abortController.current.signal,
          })
        );
      } else {
        // 삽화 생성 요청
        console.log("삽화 생성 요청");
        dispatch(
          thunkCreateImage({
            pageNum: index - 1,
            body: {
              text: newText,
            },
            signal: abortController.current.signal,
          })
        );
      }
      setImageStatus("loading");
    }
  };

  // 삽화 생성되면 로딩 해제
  useEffect(() => {
    if (page.imgUrl === "blank") {
      setImageStatus("blank");
    } else if (page.imgUrl !== "") {
      setImageStatus("show");
    } else {
      setImageStatus("loading");
    }
  }, [page.imgUrl]);

  return (
    <Root $show={show}>
      <Container $show={show} ref={container}>
        {imageStatus === "show" ? (
          <Image src={page.imgUrl} loading="lazy" />
        ) : (
          <Blank>
            {imageStatus === "loading" && (
              <DotLoader color={colors.theme3} size={"10vw"} />
            )}
          </Blank>
        )}
        <TextWrapper
          ref={textWrapper}
          $x={percentX}
          $y={percentY}
          $isCover={index === 0}
          $hideShadow={imageStatus !== "show"}
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
            placeholder="이야기를 적어보아요"
            $focus={focus}
            $isCover={index === 0}
          ></TextArea>
        </TextWrapper>
        <PageNum>{index !== 0 && index}</PageNum>
      </Container>
      {
        <CreateImgButton onClick={onCreateImage} $background={colors.theme3}>
          {imageStatus === "loading"
            ? "취소"
            : index === 0
            ? "표지 만들기"
            : "삽화 만들기"}
        </CreateImgButton>
      }
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${(props) => !props.$show && "0px"};
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Container = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 1vw;
  overflow: hidden;
  box-shadow: 10px 10px 60px 0px rgba(0, 0, 0, 0.15);
`;

const Image = styled.img`
  width: 100%;
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  /* 이미지 드래그 막기 */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
`;

const Blank = styled.div`
  width: 100%;
  position: absolute;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
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
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0px 0px 30px 30px rgba(0, 0, 0, 0.4);
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
  font-family: "SKYBORI";
  line-height: 1.8vw;
  letter-spacing: 0.05vw;
  word-break: keep-all;
  border-radius: 2.5vw;
  overflow: hidden;
  ${(props) =>
    props.$isCover &&
    `padding: 0.5vw;
    font-size: 3vw;
    font-weight: bold;
    word-break: keep-all;
    text-align: center;
    font-family: "SKYBORI";
    letter-spacing: -0.3vw;
    border-radius: 5em;
    line-height: 4vw;`};

  &:focus {
    /* outline: 1px solid white; */
  }
  ${(props) => (props.$focus ? "outline: 1px solid white" : "outline: none")};

  /* 우측하단의 크기조절 손잡이 숨기기 */
  &::-webkit-resizer {
    /* display: none; */
    pointer-events: none;
  }
  color: white;
`;

const PageNum = styled.div`
  color: white;
  text-align: center;
  position: absolute;
  bottom: 1px;
  font-size: 1.5vw;
`;

const CreateImgButton = styled.div`
  background: ${({ $background }) => $background};
  display: flex;
  align-items: center;
  height: 26px;
  margin-top: 10px;
  padding: 6px 10px;
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.3);
  &:hover {
    cursor: pointer;
    color: white;
    background: rgba(255, 255, 255, 0.4);
  }
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
