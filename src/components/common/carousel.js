export const settings = {
  className: "center",
  centerMode: true,
  centerPadding: "150px",
  // arrow: true,
  dots: true,
  infinite: true,
  slidesToShow: 3,
  // slidesToScroll: 5,
  // swipeToSlide: true,
  speed: 300,
  // initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

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

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
