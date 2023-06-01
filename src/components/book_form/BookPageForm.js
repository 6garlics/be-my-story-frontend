import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

const BookPageForm = ({ page, index, pageNum }) => {
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
  useEffect(() => {
    setText(page.text);
  }, [page]);
  console.log(page);
  return (
    <Container index={index} pageNum={pageNum}>
      <Fieldset>
        {/* <legend>사진선택</legend> */}
        {page.images.map((bike, id) => (
          <div key={id}>
            <RadioButton
              id={id}
              type="radio"
              name="bikes"
              value={id}
              onChange={() => changeImage(id)}
            />
            <Label htmlFor={id}>
              <PreviewImage src={bike} id={id} selectedImage={selectedImage} />
            </Label>
          </div>
        ))}
      </Fieldset>
      <Image src={page.images[selectedImage]} />
      <Text value={text} onChange={changeText}></Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: ${(props) => props.index !== props.pageNum && "none"};
`;

const RadioButton = styled.input`
  display: none;
`;

const Label = styled.label``;

const Fieldset = styled.fieldset`
  display: flex;
  border: none;
  padding: 0;
`;

const PreviewImage = styled.img`
  width: 50px;
  height: 50px;
  margin: 10px 10px;
  margin-top: 40px;
  border-radius: 5px;
  border: ${(props) =>
    props.id === props.selectedImage && "5px solid #74eabcff"};
`;

const Image = styled.img`
  width: 300px;
  margin: 20px;
  border-radius: 10px;
`;

const Text = styled.textarea`
  width: 400px;
  height: 130px;
  padding: 10px;
  resize: none;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid lightgrey;
`;

export default BookPageForm;
