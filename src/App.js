import Timeline from "./pages/Timeline";
import Diary from "./pages/Diary";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
    </div>
  );
}

export default App;
