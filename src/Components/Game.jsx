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
  } = useContext(QuizContext);
  useEffect(() => console.log(currentQuestion));
  const select = (item) => {
    selectAnswer(item);
  };
  return (
    <>
      {health} / {AvailableHealths}
      <div>
        <p className="fs-4 text-success text-center">
          {currentQuestion.question}
        </p>
        <div className="mt-3">
          <div className="row">
            {RandomizeAnswers(currentQuestion.options).map((i) => (
              <>
                <div className="col-6 mb-3">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => select(i)}>
                    {i.option}
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Game;
