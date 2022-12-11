import "./App.css";
import ChessBoard from "./screens/ChessBoard";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaitingScreen from "./screens/WaitingScreen";
import LoginOrSignup from "./screens/LoginOrSignup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginOrSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/waiting" element={<WaitingScreen />} />
        <Route path="/room/:roomid" element={<ChessBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
