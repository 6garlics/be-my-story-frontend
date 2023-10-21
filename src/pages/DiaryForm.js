import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import ColorContext from "./../contexts/Color";
import {
  bookSlice,
  thunkCreateCover,
  thunkCreateImage,
  thunkCreateTexts,
} from "../redux/bookSlice";

const genres = ["모험", "우주", "바다", "공룡", "마법", "히어로"];

// const days = ["일", "월", "화", "수", "목", "금", "토"];

const DiaryForm = () => {
  const [date, setDate] = useState(new window.Date());
  const [diaryTitle, setTitle] = useState("");
  const [contents, setText] = useState("");
  const [characterName, setCharacterName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(0); //현재 작성 중인 폼

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const title = useSelector((state) => state.book.title);
  const pages = useSelector((state) => state.book.pages);
  const length = useSelector((state) => state.book.length);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const imageCnt = useSelector((state) => state.book.imageCnt);
  const colors = useContext(ColorContext);

  //랜덤 토픽 생성
  const getTopic = () => {
    setTopic(topics[Math.floor(Math.random() * topics.length)]);
  };

  //초기 랜덤 토픽 설정
  useEffect(() => {
    getTopic();
  }, []);

  //일기 제출 핸들러 (일기 저장, 동화 텍스트 생성)
  const submitDiary = async (event) => {
    event.preventDefault();
    setLoading(true);

    //폼데이터 가공
    const formData = new FormData(event.target);
    formData.delete("genre");
    formData.append("genre", genres[selectedGenre]);
    formData.delete("date");
    formData.append("date", dateToString(date));
    console.log("작성된 일기", Object.fromEntries(formData));

    //리덕스 초기화
    dispatch(bookSlice.actions.reset());

    //일기 저장
    postDiary(formData).then((diaryData) => {
      dispatch(bookSlice.actions.setDiaryId(diaryData.diaryId));
    });

    formData.delete("genre");
    formData.append("keyword", genres[selectedGenre]);

    //동화 텍스트 생성
    formData.delete("date");
    dispatch(thunkCreateTexts(formData));

    //메타데이터 저장
    dispatch(bookSlice.actions.setGenre(genres[selectedGenre]));
    dispatch(bookSlice.actions.setDate(dateToString(date)));
  };

  //표지와 일러스트 생성, book-edit으로 리다이렉션
  useEffect(() => {
    async function createBook() {
      //제목과 텍스트는 생성되고, 커버와 일러스트는 생성 안된 상태라면
      if (title && length !== 0 && coverUrl === "" && imageCnt === 0) {
        // \n을 <br>로 대체
        dispatch(bookSlice.actions.setEnter());
        //표지 생성
        dispatch(
          thunkCreateCover({
            title: title,
            texts: pages.map((page) => page.text).slice(0, length),
          })
        );

        //일러스트 여러장 생성
        for (let i = 0; i < length; i++) {
          dispatch(
            thunkCreateImage({
              pageNum: i,
              body: {
                text: pages[i].text,
              },
            })
          );
        }

        //수정페이지로 리다이렉션
        navigate(`/book-edit`);
      }
    }
    createBook();
  }, [title, pages, length, coverUrl, imageCnt, dispatch, navigate]);

  //날짜 포맷팅 함수
  const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return loading ? (
    <S.Loader>
      <DotLoader color={colors.theme3} size={100} />
      <S.LoaderText>동화책을 만들고 있어요!</S.LoaderText>
    </S.Loader>
  ) : (
    <S.Container>
      <S.Wrapper>
        {/* 일기 토픽 */}
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
              <S.Button
                type="button"
                onClick={() => setPage((prev) => prev + 1)}
              >
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
                      <S.Genre
                        $selected={index === selectedGenre}
                        $background={colors.theme5}
                      >
                        {genre}
                      </S.Genre>
                    </S.GenreLabel>
                  );
                })}
              </S.Genres>
            </S.GenreWrapper>
            <S.ButtonWrapper>
              <S.Button
                type="button"
                onClick={() => setPage((prev) => prev - 1)}
              >
                <S.Img src={arrowLeft} />
                <S.Text>이전</S.Text>
              </S.Button>
              <S.Button type="submit" $background={colors.theme5}>
                만들기
              </S.Button>
            </S.ButtonWrapper>
          </S.FormBox>
        </S.Form>
      </S.Wrapper>
    </S.Container>
  );
};

export default DiaryForm;
