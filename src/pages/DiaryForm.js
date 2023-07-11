import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

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

const suggestions = [
  "오늘 친구랑 가장 재밌었던 일은 뭐야?",
  "친구랑 가장 해보고 싶은 것은 뭐야?",
  "너랑 가장 친한 친구에 대해서 얘기해줘",
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

  const getRequest = async () => {
    try {
      const response = await axios.get("http://43.202.81.68:80/test1", {
        headers: {
          "Content-Type": "application/json",
        },
        //withCredentials: true,
      });
      console.log("GET 응답 데이터: ", response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  //GET 요청
  // useEffect(() => {
  //   const response = getRequest();
  //   console.log(response.data);
  // }, []);

  //POST 요청
  const submitDiary = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("story_type", genres[selectedGenre]);
    formData.delete("date");
    formData.append("date", dateToString(date));
    console.log(Object.fromEntries(formData));

    try {
      const response = await axios.post(
        "http://43.202.81.68:80/books",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          //withCredentials: true,
        }
      );
      console.log("POST 응답 데이터: ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const dateToString = (date) => {
    const yyyy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  console.log(dateToString(date));

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form onSubmit={submitDiary}>
        {/* <Date type="text" name="date" value={getToday()} /> */}
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
        <Suggestion>오늘 가장 재밌었던 일이 뭐야?</Suggestion>
        <Title
          placeholder="제목"
          name="subject"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text
          placeholder="일기를 써주세요."
          name="contents"
          value={text}
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

const Date = styled.input`
  font-size: 20px;
  flex: 1;
  padding: 10px 0px;
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

const Suggestion = styled.div`
  font-size: 25px;
  flex: 1;
  padding-top: 12px;
  padding-bottom: 15px;
  border-bottom: 1px solid grey;
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

const Text = styled.textarea`
  flex: 15;
  font-size: 20px;
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
