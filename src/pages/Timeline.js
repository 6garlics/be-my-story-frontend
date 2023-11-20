import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCover from "../components/timeline/BookCover";
import { getBooks } from "../api/books";
import ArrowButton from "../components/common/ArrowButton";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../redux/userSlice";
import { timelineSlice } from "./../redux/timelineSlice";
import { useRef } from "react";
import refreshIcon from "../assets/refresh.svg";

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  z-index: 2;
  border-radius: 25px;
`;

function Timeline() {
  const [hide, setHide] = useState(true);
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);

  const page = useSelector((state) => state.timeline.page);
  const savedPage = useSelector((state) => state.timeline.savedPage);
  const index = useSelector((state) => state.timeline.index);
  const bookList = useSelector((state) => state.timeline.bookList);
  const refresh = useSelector((state) => state.user.refresh);

  const sliderRef = useRef();
  const dispatch = useDispatch();

  //로그인 직후 새로고침
  useEffect(() => {
    if (refresh) {
      dispatch(userSlice.actions.setRefresh(false));
      window.location.reload();
    }
  }, []);

  //원래 보고있던 동화책으로 이동
  useEffect(() => {
    setInterval(() => setHide(false), 100);
    sliderRef.current.slickGoTo(index);
  }, []);

  //전체 동화책 조회
  useEffect(() => {
    async function fetchBooks() {
      //아직 리덕스에 저장되지 않은 페이지라면
      if (page !== savedPage) {
        const data = await getBooks(page);
        dispatch(
          timelineSlice.actions.setBookList([...bookList, ...data.content])
        );
        dispatch(timelineSlice.actions.setSavedPage(page));
      }
    }
    fetchBooks();
  }, [page]);

  //처음으로 클릭 시
  const onClickRefresh = () => {
    sliderRef.current.slickGoTo(0);
  };

  const settings = {
    adaptiveHeight: true,
    slidesToShow: 3,
    swipeToSlide: true,
    speed: 200,
    beforeChange: (current, next) => {
      if (next >= 10 * (page + 1) - 5) {
        dispatch(timelineSlice.actions.setPage(page + 1));
        setOldSlide(current);
        setActiveSlide(current + 1);
      } else {
        setOldSlide(current);
        setActiveSlide(next);
      }
      dispatch(timelineSlice.actions.setIndex(next));
    },
    afterChange: (current) => {
      if (current === 0) {
        setActiveSlide2(activeSlide);
      } else {
        setActiveSlide2(current);
      }
    },
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
  };

  return (
    <Root>
      <Container>
        <SliderWrapper $hide={hide}>
          <Slider {...settings} ref={sliderRef}>
            {bookList.map((book, index) => (
              <BookCover
                key={index}
                bookId={book.bookId}
                userName={book.userName}
                title={book.title}
                titlePos={{ x: book.titleX, y: book.titleY }}
                coverUrl={book.coverUrl}
              />
            ))}
          </Slider>
          <RefreshButton onClick={onClickRefresh}>
            처음으로
            <Image src={refreshIcon} />
          </RefreshButton>
        </SliderWrapper>
      </Container>
    </Root>
  );
}

const Root = styled.div`
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SliderWrapper = styled.div`
  visibility: ${({ $hide }) => $hide && "hidden"};
  width: 1200px;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  //기존 버튼 숨기기
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-initialized{
    width: 100%;
  }
  .slick-track{
    height: 500px;
  }
  .slick-slide{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .book-cover{
      width: 300px;
    }
  }
  .slick-current + .slick-active{
    .book-cover{
      width: 370px;
    }
  }
  .slick-dots {
    .slick-active {
      button::before {
        color: white;
      }
    }
    button::before {
      color: #e9e9e9;
    }
  }s
`;

const RefreshButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 80px;
  bottom: 90px;
  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  margin-left: 6px;
`;

export default Timeline;
