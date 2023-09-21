import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { DotLoader } from "react-spinners";
import { createCover, createImage, createTexts } from "../api/AIbooks";
import { getMyInfo } from "../api/users";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  setGenre,
  setSaved,
  thunkCreateCover,
  thunkCreateImage,
  thunkCreateTexts,
} from "../redux/bookSlice";
import { postDiary, postBook } from "../api/books";

const genres = ["모험", "우주", "바다", "공룡", "전래동화", "마법", "신화"];

const suggestions = [
  "오늘 친구랑 가장 재밌었던 일은 뭐야?",
  "친구랑 가장 해보고 싶은 것은 뭐야?",
  "너랑 가장 친한 친구에 대해서 얘기해줘",
];

const days = ["일", "월", "화", "수", "목", "금", "토"];

const DiaryForm = () => {
  const [date, setDate] = useState(new window.Date());
  const [diaryTitle, setTitle] = useState("자전거");
  const [contents, setText] = useState(
    "오늘 밤에 자전거를 탔다. 자전거는 처음 탈 때는 좀 중심잡기가 힘들었다. 그러나 재미있었다. 자전거를 잘 타서 엄마, 아빠 산책 갈 때 나도 가야겠다."
  );
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [diaryId, setDiaryId] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const title = useSelector((state) => state.book.title);
  const texts = useSelector((state) => state.book.texts);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const images = useSelector((state) => state.book.images);
  const imageCnt = useSelector((state) => state.book.imageCnt);
  const saved = useSelector((state) => state.book.saved);

  console.log("동화 텍스트", title, texts);

  //일기 제출 핸들러
  const submitDiary = async (event) => {
    event.preventDefault();
    setLoading(true);

    //폼데이터 가공
    const formData = new FormData(event.target);
    formData.delete("genre");
    formData.append("genre", genres[selectedGenre]);
    formData.delete("date");
    formData.append("date", dateToString(date));
    console.log(Object.fromEntries(formData));

    //일기 저장
    const diaryData = await postDiary(formData);
    setDiaryId(diaryData.diaryId);

    //리덕스 초기화
    dispatch(reset());

    //메타데이터 저장
    dispatch(setDiaryId(diaryId));
    dispatch(setGenre(genres[selectedGenre]));
    dispatch(setDate(dateToString(date)));

    //동화 텍스트 생성
    dispatch(thunkCreateTexts(formData));
  };

  useEffect(() => {
    async function createBook() {
      //텍스트가 생성되면
      if (title && texts.length !== 0 && coverUrl === "" && imageCnt === 0) {
        //표지 생성
        dispatch(
          thunkCreateCover({
            title: title,
            texts: texts,
          })
        );

        //일러스트 여러장 생성
        texts.forEach(async (text, pageNum) => {
          dispatch(
            thunkCreateImage({
              pageNum: pageNum,
              body: {
                text: text,
              },
            })
          );
        });

        //열람페이지로 리다이렉션
        navigate(`/new-book/detail`, {
          state: {
            diaryId: diaryId,
            genre: genres[selectedGenre],
            date: dateToString(date),
            userName: userName,
            title: title,
            texts: texts,
          },
        });
      }
    }
    createBook();
  }, [title]);

  const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return loading ? (
    <Loader>
      <DotLoader color="#78B9FF" size={100} />
      <LoaderText>동화책을 만들고 있어요!</LoaderText>
    </Loader>
  ) : error ? (
    <Error>에러가 발생했어요.</Error>
  ) : (
    <Wrapper>
      <Suggestion>오늘 가장 재밌었던 일이 뭐야?</Suggestion>
      <Form onSubmit={submitDiary}>
        <SDatePicker
          value={date}
          name="date"
          dateFormat="yyyy년 MM월 dd일"
          maxDate={new window.Date()}
          locale={ko}
          selected={date}
          onChange={(date) => setDate(date)}
        />
        {/* <Suggestion>{suggestions[Math.floor(Math.random() * 3)]}</Suggestion> */}
        <Title
          placeholder="제목"
          name="title"
          value={diaryTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Contents
          placeholder="일기를 써주세요."
          name="contents"
          value={contents}
          onChange={(e) => setText(e.target.value)}
        />
        <Genres>
          {genres.map((genre, index) => {
            return (
              <Label key={index}>
                <RadioButton
                  type="radio"
                  name="genre"
                  value={index}
                  onChange={(e) => setSelectedGenre(index)}
                />
                <Genre index={index} selectedGenre={selectedGenre}>
                  {genre}
                </Genre>
              </Label>
            );
          })}
        </Genres>
        <SubmitButton type="submit">다음</SubmitButton>
      </Form>
    </Wrapper>
  );
};

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
  color: grey;
  font-size: 20px;
`;

const LoaderText = styled.div`
  margin-top: 40px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 60px);
  padding-top: 50px;
  padding-bottom: 70px;
  box-sizing: border-box;
`;

const Suggestion = styled.div`
  flex: none;
  font-size: 50px;
  font-family: "Gaegu";
  padding: 20px 0;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 700px;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 25px;
  color: black;
  background: white;
`;

const SDatePicker = styled(DatePicker)`
  height: 40px;
  font-size: 20px;
  border-radius: 10px 10px;
  text-align: center;
  border: none;
  background: #beddff;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

const Title = styled.input`
  flex: 1.5;
  border: none;
  font-size: 25px;
  padding-top: 25px;
  padding-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const Contents = styled.textarea`
  flex: 15;
  font-size: 17px;
  line-height: 25px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Genres = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
`;

const Label = styled.label``;

const RadioButton = styled.input`
  display: none;
`;

const Genre = styled.div`
  min-width: 50px;
  text-align: center;
  margin: 6px;
  padding: 5px 10px;
  border-radius: 50px;
  outline: 1px solid lightgrey;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  ${(props) =>
    props.index === props.selectedGenre
      ? { background: "#BEDDFF", fontWeight: "bold", outline: "none" }
      : { background: "white" }}
`;

const SubmitButton = styled.button`
  flex: 1.5;
  border: none;
  border-radius: 10px;
  background-color: #beddff;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

export default DiaryForm;
