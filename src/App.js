import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import Timeline from "./pages/Timeline";
import DiaryForm from "./pages/DiaryForm";
import BookEditPage from "./pages/BookEditPage";
import Bookshelf from "./pages/Bookshelf";
import Login from "./pages/Login";
import Header from "./components/common/Header";
import Join from "./pages/Join";
import { useContext, useEffect } from "react";
import ColorContext from "./contexts/Color";
import BookDetail from "./pages/BookDetail";
import { useDispatch, useSelector } from "react-redux";
import { postBook } from "./api/books";
import { bookSlice } from "./redux/bookSlice";
import MailBoxPage from "./pages/MailBoxPage";
import PrivateRoutes from "./accessControl/PrivateRoutes";
import "./fonts/font.css";

function App() {
  const dispatch = useDispatch();
  const colors = useContext(ColorContext);
  const diaryId = useSelector((state) => state.book.diaryId);
  const genre = useSelector((state) => state.book.genre);
  const date = useSelector((state) => state.book.date);
  const title = useSelector((state) => state.book.title);
  const coverUrl = useSelector((state) => state.book.coverUrl);
  const pages = useSelector((state) => state.book.pages);
  const length = useSelector((state) => state.book.length);
  const imageCnt = useSelector((state) => state.book.imageCnt);
  const saved = useSelector((state) => state.book.saved);

  //최초 동화책 저장
  useEffect(() => {
    async function saveBook() {
      //동화책이 완성됐지만 아직 저장되지 않았다면
      if (title && length !== 0 && coverUrl && imageCnt === length && !saved) {
        //바디 가공
        const body = {
          diaryId: diaryId,
          title: title,
          genre: genre,
          coverUrl: coverUrl,
          date: date,
          pages: pages.slice(0, length),
        };
        console.log(body);
        const bookData = await postBook(body); //최초 동화책 저장
        dispatch(bookSlice.actions.setBookId(bookData.bookId)); //bookId 저장
        dispatch(bookSlice.actions.setSaved(true)); //저장됐다고 표시
      }
    }
    saveBook();
  }, [
    imageCnt,
    coverUrl,
    date,
    diaryId,
    genre,
    saved,
    title,
    pages,
    length,
    dispatch,
  ]);

  return (
    <Container className="App" $background={colors.background}>
      <Header />

      <Main>
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />

          {/* 접근제한 페이지 */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Timeline />} />
            <Route path="/diary-form" element={<DiaryForm />} />
            <Route path="/book-edit" element={<BookEditPage />} />
            <Route
              path="/bookshelf/:userName"
              Component={(props) => (
                <Bookshelf {...props} key={window.location.pathname} />
              )}
            />
            <Route path="/book/:bookId/detail" element={<BookDetail />} />
            <Route path="/mail-box" element={<MailBoxPage />} />
          </Route>
        </Routes>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
  background: ${(props) => props.$background};
  font-family: "SKYBORI" !important;
  font-size: 18px;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)),
    url(/images/star.png) no-repeat center fixed;
  background-size: cover;
`;

const Main = styled.main`
  flex: 1;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
  margin-top: 60px;
`;

export default App;
