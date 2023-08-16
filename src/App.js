import { Routes, Route, NavLink } from "react-router-dom";
import { styled } from "styled-components";
import Timeline from "./pages/Timeline";
import DiaryForm from "./pages/DiaryForm";
import BookForm from "./pages/BookForm";
import Bookshelf from "./pages/Bookshelf";
import NewBookDetail from "./pages/NewBookDetail";
import Login from "./pages/Login";
import Header from "./components/common/Header";
import Join from "./pages/Join";
import { useContext } from "react";
import ColorContext from "./contexts/Color";
import Page from "./components/common/Page";
import Book from "./components/timeline/Book";
import BookDetail from "./pages/BookDetail";
import PrivateRoutes from "./accessControl/PrivateRoutes";

function App() {
  const colors = useContext(ColorContext);
  return (
    <Container className="App" $background={colors.background}>
      <Header />

      <Main>
        <Routes>
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Timeline />} />
            <Route path="/diary-form" element={<DiaryForm />} />
            <Route path="/book-form" element={<BookForm />} />
            <Route
              path="/bookshelf/:userName"
              Component={(props) => (
                <Bookshelf {...props} key={window.location.pathname} />
              )}
            />
            <Route path="/book/:bookId/detail" element={<BookDetail />} />
            <Route
              path="/new-book/:bookId/detail"
              element={<NewBookDetail />}
            />
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
