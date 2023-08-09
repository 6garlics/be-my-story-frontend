import { Routes, Route, NavLink } from "react-router-dom";
import { styled } from "styled-components";
import Timeline from "./pages/Timeline";
import DiaryForm from "./pages/DiaryForm";
import BookForm from "./pages/BookForm";
import Bookshelf from "./pages/Bookshelf";
import BookDetail from "./components/book_shelf/BookDetail";
import Login from "./pages/Login";
import Header from "./components/common/Header";
import JoinPage from "./pages/JoinPage";
import { useContext } from "react";
import ColorContext from "./contexts/Color";
import Page from "./components/common/Page";
import Book from "./components/timeline/Book";

function App() {
  const colors = useContext(ColorContext);
  return (
    <Container className="App" $background={colors.background}>
      <Header />

      <Main>
        <Routes>
          <Route path="/test" element={<Book />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Timeline />} />
          <Route path="/diary-form" element={<DiaryForm />} />
          <Route path="/book-form" element={<BookForm />} />
          <Route
            path="/bookshelf/:id"
            Component={(props) => (
              <Bookshelf {...props} key={window.location.pathname} />
            )}
          />
          <Route path="/book/:id/detail" element={<BookDetail />} />
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
`;

const Main = styled.main`
  flex: 1;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/images/sea.jpg) no-repeat center fixed;
  background-size: cover;
  margin-top: 60px;
`;

export default App;
