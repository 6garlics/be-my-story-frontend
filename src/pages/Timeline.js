import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { settings } from "../components/common/carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookCover from "../components/timeline/BookCover";
import { getBooks } from "../api/books";

//const id = 0;
const booksData = [
  {
    bookId: 27,
    userName: "cat",
    title: "랄랄라",
    date: "",
    genre: "",
    coverUrl:
      "https://t4.ftcdn.net/jpg/05/55/59/43/1000_F_555594374_OXYC3gAnPNLfr3smkYsWPTQJVYPV3UYP.jpg",
    texts: ["첫번째 문단", "두번째 문단", "세번째 문단"],
    images: [
      {
        imgUrl:
          "https://t4.ftcdn.net/jpg/03/49/81/77/1000_F_349817774_NvqiNi9fVYO1SIcdqiwaJGyjwT0dRI8e.jpg",
      },
      {
        imgUrl:
          "https://t4.ftcdn.net/jpg/05/69/55/11/1000_F_569551106_FELWntaV4NlNHL5Qjg5iCNMokor5Ujjb.jpg",
      },
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/05/67/77/30/1000_F_567773066_kew8LmnKsJKc8eYQbVC9vmJAGuXEQG2t.jpg",
      },
    ],
  },
  {
    bookId: 28,
    userName: "lion",
    title: "룰룰루",
    date: "",
    genre: "",
    coverUrl:
      "https://t4.ftcdn.net/jpg/05/47/81/59/1000_F_547815918_svDjWQ7kKO3BFO6SwVxiDUpZ9Ab9FZM2.jpg",
    texts: ["첫번째 문단", "두번째 문단"],
    images: [
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/05/37/60/32/1000_F_537603256_DZAWtM86Z8LtQ0QDDAA3cN0jmRt0Idk7.jpg",
      },
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/04/56/99/06/1000_F_456990624_XjNK1xPQwQupyWatvJoT7dgBlHwQvbPI.jpg",
      },
    ],
  },
  {
    bookId: 29,
    userName: "frog",
    title: "랄랄라",
    date: "",
    genre: "",
    coverUrl:
      "https://t4.ftcdn.net/jpg/05/55/59/43/1000_F_555594374_OXYC3gAnPNLfr3smkYsWPTQJVYPV3UYP.jpg",
    texts: ["첫번째 문단", "두번째 문단", "세번째 문단"],
    images: [
      {
        imgUrl:
          "https://t4.ftcdn.net/jpg/03/49/81/77/1000_F_349817774_NvqiNi9fVYO1SIcdqiwaJGyjwT0dRI8e.jpg",
      },
      {
        imgUrl:
          "https://t4.ftcdn.net/jpg/05/69/55/11/1000_F_569551106_FELWntaV4NlNHL5Qjg5iCNMokor5Ujjb.jpg",
      },
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/05/67/77/30/1000_F_567773066_kew8LmnKsJKc8eYQbVC9vmJAGuXEQG2t.jpg",
      },
    ],
  },
  {
    bookId: 30,
    userName: "jiwon",
    title: "룰룰루",
    date: "",
    genre: "",
    coverUrl:
      "https://t4.ftcdn.net/jpg/05/47/81/59/1000_F_547815918_svDjWQ7kKO3BFO6SwVxiDUpZ9Ab9FZM2.jpg",
    texts: ["첫번째 문단", "두번째 문단"],
    images: [
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/05/37/60/32/1000_F_537603256_DZAWtM86Z8LtQ0QDDAA3cN0jmRt0Idk7.jpg",
      },
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/04/56/99/06/1000_F_456990624_XjNK1xPQwQupyWatvJoT7dgBlHwQvbPI.jpg",
      },
    ],
  },
  {
    bookId: 31,
    userName: "whale",
    title: "랄랄라",
    date: "",
    genre: "",
    coverUrl:
      "https://t4.ftcdn.net/jpg/05/55/59/43/1000_F_555594374_OXYC3gAnPNLfr3smkYsWPTQJVYPV3UYP.jpg",
    texts: ["첫번째 문단", "두번째 문단", "세번째 문단"],
    images: [
      {
        imgUrl:
          "https://t4.ftcdn.net/jpg/03/49/81/77/1000_F_349817774_NvqiNi9fVYO1SIcdqiwaJGyjwT0dRI8e.jpg",
      },
      {
        imgUrl:
          "https://t4.ftcdn.net/jpg/05/69/55/11/1000_F_569551106_FELWntaV4NlNHL5Qjg5iCNMokor5Ujjb.jpg",
      },
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/05/67/77/30/1000_F_567773066_kew8LmnKsJKc8eYQbVC9vmJAGuXEQG2t.jpg",
      },
    ],
  },
  {
    bookId: 32,
    userName: "jiwon",
    title: "룰룰루",
    date: "",
    genre: "",
    coverUrl:
      "https://t4.ftcdn.net/jpg/05/47/81/59/1000_F_547815918_svDjWQ7kKO3BFO6SwVxiDUpZ9Ab9FZM2.jpg",
    texts: ["첫번째 문단", "두번째 문단"],
    images: [
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/05/37/60/32/1000_F_537603256_DZAWtM86Z8LtQ0QDDAA3cN0jmRt0Idk7.jpg",
      },
      {
        imgUrl:
          "https://t3.ftcdn.net/jpg/04/56/99/06/1000_F_456990624_XjNK1xPQwQupyWatvJoT7dgBlHwQvbPI.jpg",
      },
    ],
  },
];

function Timeline() {
  const [books, setBooks] = useState([]);

  //전체 동화책 조회
  useEffect(() => {
    async function fetchBooks() {
      const data = await getBooks();
      setBooks(data.content);
    }
    fetchBooks();
  }, []);

  return (
    <Root>
      <Container>
        <SliderWrapper>
          <Slider {...settings}>
            {books.map((book, index) => (
              <BookCover
                key={index}
                bookId={book.bookId}
                userName={book.userName}
                title={book.title}
                coverUrl={book.coverUrl}
              />
            ))}
          </Slider>
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
/* border: 1px solid white; */
  width: 1000px;
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
    /* border: 1px solid grey; */
  }
  .slick-track{
    height: 500px;
  }
  .slick-slide{
    /* transition: all 0.5s ease-in-out; */
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .book-cover{
      width: 230px;
    }
  }
  .slick-current + .slick-active{
    .book-cover{
      width: 300px;
    }
  }
  /* .center .slick-slide{
    pointer-events: none;
    z-index: 0;
    filter : brightness(60%);
    .book-cover {
      width: 300px;
      .header{
        visibility: hidden;
      }
    }
  }
  .center .slick-active {
    z-index: 1;
    filter : brightness(80%);
    .book-cover {
      width: 400px;
    }
  }
  .center .slick-center {
    pointer-events: auto;
    z-index: 2;
    filter : brightness(100%);
    .book-cover {
      width: 500px;
      .header{
        visibility: visible;
      }
    }
  } */
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

export default Timeline;
