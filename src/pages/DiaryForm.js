import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const genres = [
  "모험",
  "성장",
  "판타지",
  "코미디",
  "우화",
  "SF",
  "추리",
  "드라마",
];

const days = ["일", "월", "화", "수", "목", "금", "토"];

const DiaryForm = () => {
  const [date, setDate] = useState(new window.Date());
  const [title, setTitle] = useState("자전거");
  const [text, setText] = useState(
    "오늘 밤에 자전거를 탔다. 자전거는 처음 탈 때는 좀 중심잡기가 힘들었다. 그러나 재미있었다. 자전거를 잘 타서 엄마, 아빠 산책 갈 때 나도 가야겠다."
  );
  const [selectedGenre, setSelectedGenre] = useState(0);
  const navigate = useNavigate();

  const submitDiary = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("storyType", genres[selectedGenre]);
    console.log(Object.fromEntries(formData));

    const response = await axios.post("http://3.38.76.97:80/books", formData, {
      headers: {
        "Content-Type": "application/json",
      },
      //withCredentials: true,
    });
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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form onSubmit={submitDiary}>
        <Date>{getToday()}</Date>
        {/* <DatePicker selected={date} onChange={(date) => setDate(date)} /> */}
        <Suggestion>오늘 가장 재미있었던 일은 뭐야?</Suggestion>
        <Title
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text
          placeholder="일기를 써주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Genres>
          {genres.map((genre, index) => {
            return (
              <Label key={index}>
                <RadioButton
                  type="radio"
                  name="genres"
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
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 700px;
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
  width: 50px;
  text-align: center;
  margin: 8px;
  padding: 5px 10px;
  border-radius: 50px;
  outline: 1px solid lightgrey;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
  ${(props) =>
    props.index === props.selectedGenre
      ? { background: "#74eabcff", fontWeight: "bold", outline: "none" }
      : { background: "white" }}
`;

const SubmitButton = styled.button`
  flex: 1.5;
  border: none;
  border-radius: 10px;
  background-color: #74eabcff;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;

export default DiaryForm;
