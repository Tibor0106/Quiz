import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { QuizContext } from "./Providers/QuizProvider";
import { useContext } from "react";
function App() {
  const { gameState } = useContext(QuizContext);
  return (
    <>
      <a href="https://github.com/Tibor0106/Quiz">Github repository</a>
      <div className="container">{gameState}</div>
    </>
  );
}

export default App;
