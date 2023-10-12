import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { DotLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { topics } from "../assets/topics.js";
import { postDiary } from "../api/books";
import refresh from "../assets/refresh.svg";
import arrowLeft from "../assets/arrowLeft.svg";
import arrowRight from "../assets/arrowRight.svg";
import { S } from "./diaryFormStyle";
import {
  bookSlice,
  thunkCreateCover,
  thunkCreateImage,
  thunkCreateTexts,
} from "../redux/bookSlice";

const genres = ["모험", "우주", "바다", "공룡", "전래동화", "마법", "신화"];

const days = ["일", "월", "화", "수", "목", "금", "토"];

const DiaryForm = () => {
  const [date, setDate] = useState(new window.Date());
  const [diaryTitle, setTitle] = useState("자전거");
  const [contents, setText] = useState(
    "오늘 밤에 자전거를 탔다. 자전거는 처음 탈 때는 좀 중심잡기가 힘들었다. 그러나 재미있었다. 자전거를 잘 타서 엄마, 아빠 산책 갈 때 나도 가야겠다."
  );
  const [characterName, setCharacterName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(0); //현재 작성 중인 폼

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  const title = useSelector((state) => state.book.title);
  const texts = useSelector((state) => state.book.texts);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const imageCnt = useSelector((state) => state.book.imageCnt);

  useEffect(() => {
    console.log("동화 텍스트", title, texts);
  }, [title, texts]);

  //랜덤 토픽 생성
  const getTopic = () => {
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
  };

  useEffect(() => {
    getTopic();
  }, []);

  //일기 제출 핸들러
  const submitDiary = async (event) => {
    event.preventDefault();
    setLoading(true);

    //폼데이터 가공
    const formData = new FormData(event.target);
    formData.delete("genre");
    formData.append("keyword", genres[selectedGenre]);
    formData.delete("date");
    // formData.append("date", dateToString(date));
    console.log("작성된 일기", Object.fromEntries(formData));

    //리덕스 초기화
    dispatch(bookSlice.actions.reset());

    //일기 저장
    postDiary(formData).then((diaryData) => {
      dispatch(bookSlice.actions.setDiaryId(diaryData.diaryId));
    });

    //동화 텍스트 생성
    dispatch(thunkCreateTexts(formData));

    //메타데이터 저장
    dispatch(bookSlice.actions.setGenre(genres[selectedGenre]));
    dispatch(bookSlice.actions.setDate(dateToString(date)));
  };

  useEffect(() => {
    async function createBook() {
      //제목과 텍스트는 생성되고, 커버와 일러스트는 생성 안된 상태라면
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

        //수정페이지로 리다이렉션
        navigate(`/book-edit`);
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
    <S.Loader>
      <DotLoader color="#78B9FF" size={100} />
      <S.LoaderText>동화책을 만들고 있어요!</S.LoaderText>
    </S.Loader>
  ) : error ? (
    <S.Error>에러가 발생했어요.</S.Error>
  ) : (
    <S.Wrapper>
      <S.TopicWrapper>
        <S.Topic>{topic}</S.Topic>
        <S.RefreshIcon src={refresh} onClick={getTopic} />
      </S.TopicWrapper>
      <S.Form onSubmit={submitDiary}>
        <S.FormBox $show={page === 0}>
          <S.Header>
            <S.SDatePicker
              value={date}
              name="date"
              dateFormat="yyyy년 MM월 dd일"
              maxDate={new window.Date()}
              locale={ko}
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </S.Header>

          <S.Title
            placeholder="제목"
            name="title"
            value={diaryTitle}
            onChange={(e) => setTitle(e.target.value)}
          />

          <S.Contents
            placeholder="일기를 써보아요."
            name="contents"
            value={contents}
            onChange={(e) => setText(e.target.value)}
          />
          <S.ButtonWrapper>
            <div></div>
            <S.Button type="button" onClick={() => setPage((prev) => prev + 1)}>
              <S.Text>다음</S.Text>
              <S.Img src={arrowRight} />
            </S.Button>
          </S.ButtonWrapper>
        </S.FormBox>
        <S.FormBox $show={page === 1}>
          <S.CharacterNameWrapper>
            <S.Label>주인공의 이름을 정해볼까요?</S.Label>
            <S.CharacterName
              name="name"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
            ></S.CharacterName>
          </S.CharacterNameWrapper>
          <S.GenreWrapper>
            <S.Label>이야기의 배경을 골라보아요.</S.Label>
            <S.Genres>
              {genres.map((genre, index) => {
                return (
                  <S.GenreLabel key={index}>
                    <S.RadioButton
                      type="radio"
                      name="genre"
                      value={index}
                      onChange={(e) => setSelectedGenre(index)}
                    />
                    <S.Genre index={index} selectedGenre={selectedGenre}>
                      {genre}
                    </S.Genre>
                  </S.GenreLabel>
                );
              })}
            </S.Genres>
          </S.GenreWrapper>
          <S.ButtonWrapper>
            <S.Button type="button" onClick={() => setPage((prev) => prev - 1)}>
              <S.Img src={arrowLeft} />
              <S.Text>이전</S.Text>
            </S.Button>
            <S.Button type="submit">만들기</S.Button>
          </S.ButtonWrapper>
        </S.FormBox>
      </S.Form>
    </S.Wrapper>
  );
};

export default DiaryForm;
