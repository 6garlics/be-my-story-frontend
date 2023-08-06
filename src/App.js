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

function App() {
  const colors = useContext(ColorContext);
  return (
    <Container className="App" $background={colors.background}>
      <Header />
      <Wrapper>
        <Main>
          <Routes>
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
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: white;
  background: ${(props) => props.$background};
`;

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
`;

export default App;
