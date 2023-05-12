import React, { useState } from "react";
import { styled } from "styled-components";

const bikes = [
  "images/bike1.png",
  "images/bike2.png",
  "images/bike3.png",
  "images/bike4.png",
];

const BookPageForm = () => {
  const [selectedBike, setSelectedBike] = useState(0);
  const [text, setText] = useState(
    "한 날 밤, 작은 아이는 엄마와 함께 자전거를 타기로 결심했어요. 그러나 자전거를 처음 탈 때는 중심을 잡는 것이 어려웠어요. 그래도 작은 아이는 멋지게 자전거를 타고 싶어서 계속 노력했어요."
  );
  const changeBike = (id) => {
    setSelectedBike(id);
    console.log(id);
  };
  const changeText = (e) => {
    // e.preventDefault();
    setText(e.target.value);
  };
  return (
    <Container>
      <fieldset style={{ display: "flex" }}>
        <legend>사진선택</legend>
        {bikes.map((bike, id) => (
          <label key={id}>
            <input
              type="radio"
              name="bikes"
              value={id}
              onChange={() => changeBike(id)}
            />
            <PreviewImage src={bike} />
          </label>
        ))}
      </fieldset>
      <Image src={bikes[selectedBike]} />
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
