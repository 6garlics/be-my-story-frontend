import React, { useState } from "react";
import { styled } from "styled-components";

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

const DiaryForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const onTextChange = (event) => {
    setText(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Date>{new window.Date().toString()}</Date>
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
      <Submit type="submit" value="다음" onSubmit={onSubmit} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: beige;
`;

const Date = styled.div`
  font-size: 18px;
  flex: 1;
`;

const Suggestion = styled.div`
  font-size: 25px;
  flex: 1;
`;

const Title = styled.input`
  flex: 1;
`;

const Text = styled.textarea`
  flex: 15;
`;

const Genre = styled.fieldset`
  flex: 2;
`;

const Submit = styled.input`
  flex: 1;
`;

export default DiaryForm;
