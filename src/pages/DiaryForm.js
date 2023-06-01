import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const genres = [
  "모험",
  "성장",
  "판타지",
  "코미디",
  "우화",
  "공상과학",
  "추리",
  "드라마",
];

const days = ["일", "월", "화", "수", "목", "금", "토"];

const DiaryForm = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onTextChange = (event) => {
    setText(event.target.value);
  };
  const submitDiary = (event) => {
    // event.preventDefault();
    navigate("/book-form");
    console.log("diary submitted.");
  };
  const getToday = () => {
    const today = new window.Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const day = days[today.getDay()];
    return `${year}년 ${month + 1}월 ${date}일 ${day}요일`;
  };
  return (
    <Container>
      <Date>{getToday()}</Date>
      <Suggestion>오늘 가장 재미있었던 일은 뭐야?</Suggestion>
      <Title placeholder="제목" value={title} onChange={onTitleChange} />
      <Text
        placeholder="일기를 써주세요."
        value={text}
        onChange={onTextChange}
      />
      <Genre>
        <legend>장르를 선택하세요.</legend>
        {genres.map((genre, key) => {
          return (
            <label key={key}>
              <input type="radio" id={genre} name="genre" value={genre} />
              {genre}
            </label>
          );
        })}
      </Genre>
      <Submit type="submit" onClick={submitDiary}>
        다음
      </Submit>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  height: 80vh;
  margin: 30px;
`;

const Date = styled.div`
  font-size: 20px;
  flex: 1;
  padding: 10px 0px;
`;

const Suggestion = styled.div`
  font-size: 20px;
  flex: 1;
  padding-top: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid grey;
`;

const Title = styled.input`
  flex: 1.5;
  border: none;
  font-size: 22px;
  padding-top: 25px;
  padding-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const Text = styled.textarea`
  flex: 15;
  font-size: 17px;
  resize: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Genre = styled.fieldset`
  display: flex;
  flex: 2;
  font-size: 16px;
  margin: 15px 0px;
  padding: 15px 10px;
  justify-content: center;
`;

const Submit = styled.button`
  flex: 1.5;
  border: none;
  border-radius: 10px;
  background-color: #74eabcff;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
  /* width: 100px; */
  /* margin-left: auto; */
  /* color: white; */
`;

export default DiaryForm;
