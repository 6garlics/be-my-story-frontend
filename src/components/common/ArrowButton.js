import React from "react";
import { useContext } from "react";
import { styled } from "styled-components";
import ColorContext from "../../contexts/Color";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const ArrowButton = ({ onClick, side }) => {
  const colors = useContext(ColorContext);
  return (
    <div>
      <Button
        onClick={onClick}
        $color={colors.theme1}
        $background={colors.theme4}
      >
        {side === "left" ? <IoIosArrowBack /> : <IoIosArrowForward />}
      </Button>
    </div>
  );
};

const Button = styled.button`
  margin: 10px;
  padding: 10px;
  font-size: 30px;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  color: white;
  background: ${({ $background }) => $background};
  opacity: 0.8;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export default ArrowButton;
