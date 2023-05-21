import React, { useState } from "react";
import { styled } from "styled-components";

const BookPageForm = ({ page }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [text, setText] = useState(page.text);
  const changeImage = (id) => {
    setSelectedImage(id);
    console.log(id);
  };
  const changeText = (e) => {
    // e.preventDefault();
    setText(e.target.value);
  };
  console.log(page);
  return (
    <Container>
      <fieldset style={{ display: "flex" }}>
        <legend>사진선택</legend>
        {page.images.map((bike, id) => (
          <label key={id}>
            <input
              type="radio"
              name="bikes"
              value={id}
              onChange={() => changeImage(id)}
            />
            <PreviewImage src={bike} />
          </label>
        ))}
      </fieldset>
      <Image src={page.images[selectedImage]} />
      <Text value={text} onChange={changeText}></Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewImage = styled.img`
  width: 50px;
  margin: 7px;
`;

const Image = styled.img`
  width: 300px;
  margin: 20px;
`;

const Text = styled.textarea`
  width: 350px;
  height: 100px;
  resize: none;
`;

export default BookPageForm;
