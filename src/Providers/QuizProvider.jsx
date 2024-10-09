import { createContext, useEffect, useState } from "react";
import QuestionsData from "../questions.json";
import LevelSelector from "../Components/LevelSelector";
import Game from "../Components/Game";
export const QuizContext = createContext();

function QuizProvider({ children }) {
  const [QuizData, setQuizData] = useState(QuestionsData);
  const [level, setLevel] = useState(null);
  const [health, setHealth] = useState(null);
  const [AvailableHealths, setAvailableHealths] = useState(null);
  const [gameState, setGameState] = useState(<LevelSelector />);
  const [usedQuestion, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [solvedQuestions, setsolvedQuestions] = useState(0);

  const SelectQuestion = () => {
    var levelsQ = [];
    QuestionsData.questions.forEach((i) => {
      if (i.level != level) levelsQ.push(i);
    });

    var rand = Math.floor(Math.random() * levelsQ.length);
    var choosed = levelsQ[rand];
    var ok = true;

    while (ok) {
      if (!usedQuestion.includes(choosed.question)) {
        ok = false;
      } else {
        rand = Math.floor(Math.random() * levelsQ.length);
        choosed = levelsQ[rand];
      }
    }
    setCurrentQuestion(choosed);
    setUsedQuestions([...usedQuestion, choosed.question]);
  };

  useEffect(() => {
    if (level != null) SelectQuestion();
  }, level);
  useEffect(() => {
    if (currentQuestion != null) setGameState(<Game />);
  }, currentQuestion);

  const HandleChoose = (choosen) => {};
  const HandleSelectLevel = (level) => {
    setLevel(level);
    setHealth(QuestionsData["healthByLevels"][level]);
    setAvailableHealths(QuestionsData["healthByLevels"][level]);
  };

  const WrongAnswer = () => {
    if (AvailableHealths - 1 == 0) HandleGameOver();
    else {
      setAvailableHealths(AvailableHealths - 1);
      setTimeout(() => SelectQuestion(), 1500);
    }
  };
  const RandomizeAnswers = (answers) => {
    if (answers == null) return [];
    var n = [];
    var usedNumbers = [];

    for (var i = 0; i < answers.length; i++) {
      var rand = Math.floor(Math.random() * 4);
      while (usedNumbers.includes(rand)) {
        rand = Math.floor(Math.random() * 4);
      }
      usedNumbers.push(rand);
      n[i] = answers[rand];
    }
    console.log(n);
    return n;
  };

  const HandleHelps = () => {};

  const selectAnswer = (ans) => {
    if (answeredQuestions - 1 == 5) {
      return setGameState(<>Nyertél</>);
    }
    setAnsweredQuestions(answeredQuestions + 1);
    if (!ans.isCorrect) WrongAnswer();
    else {
      setsolvedQuestions(solvedQuestions + 1);
      SelectQuestion();
    }
  };

  const HandleGameOver = () => {
    setGameState(
      <>
        <div>GAME OVER</div>
      </>
    );
  };
  return (
    <>
      <QuizContext.Provider
        value={{
          level,
          health,
          HandleSelectLevel,
          QuizData,
          gameState,
          currentQuestion,
          RandomizeAnswers,
          selectAnswer,
          AvailableHealths,
          solvedQuestions,
          answeredQuestions,
        }}>
        {children}
      </QuizContext.Provider>
    </>
  );
}
export default QuizProvider;
