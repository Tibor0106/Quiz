import { createContext, useEffect, useRef, useState } from "react";
import QuestionsData from "../questions.json";
import LevelSelector from "../Components/LevelSelector";
import Game from "../Components/Game";
import { FaHeart } from "react-icons/fa";
import CategorySelector from "../Components/CategorySelector";
import GameOver from "../Components/GameOver";
import Win from "../Components/Win";
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
  const [isGood, setIsGood] = useState(null);
  const [answerAvailable, setAnswerAvailbe] = useState(0);
  const [helps, setHelps] = useState([
    { id: 0, name: "Telefonos segítség", used: false },
    { id: 1, name: "Felezés", used: false },
    { id: 2, name: "+1 Élet", used: false },
  ]);
  const disabledClick = useRef(false);
  const [category, setCategory] = useState(null);
  const [animationKey, setAnimationKey] = useState(Math.random() * 100);
  const SelectQuestion = () => {
    disabledClick.current = false;
    setAnimationKey(Math.random() * 100);
    setIsGood(null);
    var levelsQ = [];
    if (level != 5) {
      QuestionsData.questions.forEach((i) => {
        if (i.level == level && i.categoryId == category.id) levelsQ.push(i);
      });
    } else {
      levelsQ = QuestionsData.questions;
    }

    console.log(level);
    var rand = Math.floor(Math.random() * levelsQ.length);
    var choosed = levelsQ[rand];
    var ok = true;
    let i = 0;

    while (ok && i < 371) {
      if (!usedQuestion.includes(choosed.question)) {
        ok = false;
      } else {
        rand = Math.floor(Math.random() * levelsQ.length);
        choosed = levelsQ[rand];
        i++;
      }
    }
    if (i == 50) {
      return alert("Elfogytak a kérédsek");
    }
    var options = choosed.options;
    choosed.options = RandomizeAnswers(options);
    setUsedQuestions([...usedQuestion, choosed.question]);
    setCurrentQuestion(choosed);
  };

  useEffect(() => {
    if (category != null) SelectQuestion();
  }, category);
  useEffect(() => {
    if (currentQuestion != null) setGameState(<Game />);
  }, currentQuestion);
  useEffect(() => {
    if (level == 5) SelectQuestion();
  }, [level]);

  const HandleChoose = (choosen) => {};
  const HandleSelectLevel = (level) => {
    setLevel(level);
    setHealth(QuestionsData["healthByLevels"][level]);
    setAvailableHealths(QuestionsData["healthByLevels"][level]);
    QuestionsData["difficulty_levels"].forEach((i) => {
      if (i.level == level) setAnswerAvailbe(i.questions);
    });
    if (level == 5) {
      setGameState(<Game />);
    } else setGameState(<CategorySelector />);
  };

  const WrongAnswer = () => {
    if (AvailableHealths - 1 == 0) HandleGameOver();
    else {
      setAvailableHealths(AvailableHealths - 1);
      setIsGood(false);
      setTimeout(() => SelectQuestion(), 1000);
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

    return n;
  };

  const HandleHelps = (helpkey) => {
    if (helps.find((k) => k.id == helpkey).used) return;

    if (helpkey == 0) {
      var a = currentQuestion.options.filter((i) => i.isCorrect);
      var c = currentQuestion;
      c.options = a;
      console.log(currentQuestion);
      console.log(c);
      setCurrentQuestion(c);
      updateHelps(helpkey);
    } else if (helpkey == 1) {
      var a = currentQuestion.options.filter((i) => i.isCorrect);
      var b = null;

      var nem = [];
      var rand = Math.floor(Math.random() * 3);
      currentQuestion.options.forEach((i) => {
        if (i.option != a[0].option) {
          nem.push(i);
        }
      });
      console.log(nem);
      var curr = currentQuestion;
      curr.options = [];
      curr.options.push(a[0]);
      curr.options.push(nem[rand]);

      setCurrentQuestion(curr);
      updateHelps(helpkey);
    } else {
      if (health == AvailableHealths) {
        alert("Maximum életnél nem használható !");
        return;
      }
      setAvailableHealths(AvailableHealths + 1);
      updateHelps(helpkey);
    }
  };

  const updateHelps = (helpkey) => {
    var h = helps;
    var i = h.filter((i) => i.id == helpkey);
    i[0].used = true;
    helps.forEach((j) => {
      if (j.id != helpkey) i.push(j);
    });
    setHelps(i);
  };
  const selectAnswer = (ans) => {
    if (disabledClick.current) return;
    setAnsweredQuestions(answeredQuestions + 1);

    disabledClick.current = true;
    if (!ans.isCorrect) WrongAnswer();
    else {
      setsolvedQuestions(solvedQuestions + 1);
      setIsGood(true);
      setTimeout(() => SelectQuestion(), 1000);
    }
    if (answeredQuestions == answerAvailable - 1) {
      setGameState(<Win />);
      return;
    }
  };

  const HandleGameOver = () => {
    setGameState(<GameOver />);
  };

  const getHearts = () => {
    var hearts = [];
    for (var i = 0; i < AvailableHealths; i++) {
      hearts.push(
        <div>
          <FaHeart className="text-danger mx-1 hearts" size={50} />
        </div>
      );
    }
    return <div className="d-flex justify-content-center">{hearts}</div>;
  };

  const HandleSelectCategory = (category) => {
    setCategory(category);
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
          isGood,
          getHearts,
          answerAvailable,
          helps,
          HandleHelps,
          HandleSelectCategory,
          category,
          animationKey,
        }}>
        {children}
      </QuizContext.Provider>
    </>
  );
}
export default QuizProvider;
