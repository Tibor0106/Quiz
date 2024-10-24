import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";

function Game() {
  const {
    RandomizeAnswers,
    currentQuestion,
    level,
    health,
    selectAnswer,
    AvailableHealths,
    solvedQuestions,
    answeredQuestions,
    isGood,
    getHearts,
    answerAvailable,
    helps,
    HandleHelps,
  } = useContext(QuizContext);
  useEffect(() => console.log(currentQuestion));
  const select = (item) => {
    selectAnswer(item);
  };

  return (
    <>
      {getHearts()}
      <div>
        {" "}
        Megválaszolt kérdések: {answeredQuestions} / {answerAvailable}
      </div>
      <div> Helyesen megoldott: {solvedQuestions}</div>

      <div>
        <p className="fs-4 text-success text-center fw-bold">
          {currentQuestion.question}
        </p>
        <div className="d-flex justify-content-center">
          <div
            className={`kep ${currentQuestion.image == null ? "d-none" : ""}`}
            style={{
              backgroundImage: `url('${currentQuestion.image}')`,
            }}></div>
        </div>
        <div className="mt-3">
          <div className="row">
            {currentQuestion.options.map((i) => (
              <>
                <div className="col-6 mb-3">
                  <button className="buttons w-100" onClick={() => select(i)}>
                    {i.option}
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <p>Segítség</p>
      <div className="d-flex justify-content-center my-3">
        {helps.map((i) => (
          <button
            className={`buttons mx-2 ${i.used ? "bg-secondary" : ""}`}
            onClick={() => HandleHelps(i.id)}>
            {i.name}
          </button>
        ))}
      </div>
      <div className="d-flex justify-content-center display">
        <div className={`answerGood ${isGood ? "isGood" : ""}`}></div>
        <div
          className={`answerWrong ${
            isGood != null ? (isGood ? "" : "isWrong") : null
          }`}></div>
      </div>
    </>
  );
}
export default Game;
