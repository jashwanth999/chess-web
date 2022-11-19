import "./App.css";
import ChessBoard from "./UI/ChessBoard";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <ChessBoard />
      <div
        style={{
          backgroundImage: `url(${require("./assets/wp.png")})`,

          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}

export default App;
