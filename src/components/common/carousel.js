import { styled } from "styled-components";
import ArrowButton from "./ArrowButton";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 2;
  border-radius: 25px;
`;

export const settings = {
  // className: "center",
  // centerMode: true,
  // centerPadding: "150px",
  // arrow: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  // slidesToScroll: 5,
  swipeToSlide: true,
  speed: 300,
  // initialSlide: 0,
  nextArrow: (
    <Wrapper>
      <ArrowButton side="right" />
    </Wrapper>
  ),
  prevArrow: (
    <Wrapper>
      <ArrowButton side="left" />
    </Wrapper>
  ),

  // responsive: [
  //   {
  //     breakpoint: 1100,
  //     settings: {
  //       slidesToShow: 4,
  //       slidesToScroll: 4,
  //       infinite: true,
  //       // dots: true,
  //     },
  //   },
  //   {
  //     breakpoint: 880,
  //     settings: {
  //       slidesToShow: 3,
  //       slidesToScroll: 3,
  //       infinite: true,
  //       // dots: true,
  //     },
  //   },
  //   {
  //     breakpoint: 670,
  //     settings: {
  //       slidesToShow: 2,
  //       slidesToScroll: 2,
  //       initialSlide: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 450,
  //     settings: {
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //     },
  //   },
  // ],
};
