import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { styled } from "styled-components";
import Timeline from "./pages/Timeline";
import DiaryForm from "./pages/DiaryForm";
import BookForm from "./pages/BookForm";
import Bookshelf from "./pages/Bookshelf";

function App() {
  return (
    <Container>
      <Header>
        <BE>BE</BE>MY STORY
      </Header>
      <Wrapper className="App">
        <Nav />
        <Main>
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/diary-form" element={<DiaryForm />} />
            <Route path="/book-form" element={<BookForm />} />
            <Route
              path="/bookshelf/:userId"
              Component={(props) => (
                <Bookshelf {...props} key={window.location.pathname} />
              )}
            />
          </Routes>
        </Main>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.header`
  display: flex;
  border-bottom: 1px solid grey;
  flex: none;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  padding: 5px;
`;

const BE = styled.div`
  color: aqua;
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
