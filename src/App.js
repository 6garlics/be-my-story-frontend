import { Routes, Route, NavLink } from "react-router-dom";
import Nav from "./components/Nav";
import { styled } from "styled-components";
import Timeline from "./pages/Timeline";
import DiaryForm from "./pages/DiaryForm";
import BookForm from "./pages/BookForm";
import Bookshelf from "./pages/Bookshelf";
import BookDetail from "./components/book_shelf/BookDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./Header";

function App() {
  return (
    <Container className="App">
      <Header />
      <Wrapper>
        <Nav />
        <Main>
          <Routes>
            <Route path="/register" element={<Register />} />
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
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
`;

export default App;
