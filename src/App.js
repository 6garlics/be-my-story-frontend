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

function App() {
  return (
    <Container>
      <Header>
        <Logo to="/">
          <BE>BE</BE>MY STORY
        </Logo>
      </Header>
      <Wrapper className="App">
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

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  flex: none;
  height: 50px;
  padding: 5px;
  border-bottom: 1px solid grey;
  font-size: 30px;
  font-weight: bolder;
`;

const Logo = styled(NavLink)`
  display: flex;
  color: black;
  text-decoration: none;
`;

const BE = styled.div`
  color: #78b9ff;
  margin-right: 13px;
`;

const Wrapper = styled.main`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
`;

export default App;
