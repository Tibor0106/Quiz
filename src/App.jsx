import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { QuizContext } from "./Providers/QuizProvider";
import { useContext } from "react";
import { motion } from "framer-motion";
function App() {
  const { gameState, level, animationKey } = useContext(QuizContext);
  return (
    <>
      <a href="https://github.com/Tibor0106/Quiz">Github repository</a>
      <h1
        className="text-center font-extrabold text-8xl my-16"
        style={{ display: level == null ? "block" : "none" }}>
        A Sorsok Kvíze
      </h1>
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="container">
        {gameState}
      </motion.div>
    </>
  );
}

export default App;
