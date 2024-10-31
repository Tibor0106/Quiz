import { useContext } from "react";
import { QuizContext } from "../Providers/QuizProvider";

function GameOver() {
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
  return (
    <>
      <div>
        <h4 className="text-center fw-bold mb-3 text-3xl">Vesztettél!</h4>
      </div>
      <div className="row">
        <div className="col">
          <div className="ms-2">
            <div className="fw-bold text-center"> Megválaszolt kérdések</div>
            <div className="abc text-center fw-bold mt-1">
              {answeredQuestions}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="me-2">
            <div className="fw-bold text-center"> Helyesen megoldott</div>
            <div className="abc-2 text-center fw-bold mt-1">
              {solvedQuestions}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <img src="https://i.giphy.com/eJ4j2VnYOZU8qJU3Py.webp" alt="" />
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success my-3"
          onClick={() => window.location.reload()}>
          Új játék indítása
        </button>
      </div>
    </>
  );
}
export default GameOver;
