import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";
import { motion } from "framer-motion";
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
    animationKey,
  } = useContext(QuizContext);
  useEffect(() => console.log(currentQuestion));
  const select = (item) => {
    selectAnswer(item);
  };
  if (currentQuestion == null) return;
  return (
    <>
      {getHearts()}
      <div className="row my-4 mx-2">
        <div className="col">
          <div className="ms-2">
            <div className="fw-bold text-center"> Megválaszolt kérdések</div>
            <div className="abc text-center fw-bold mt-1">
              {answeredQuestions} / {answerAvailable}
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

      <div>
        <p className="text-4xl text-center mt-16 mb-9 font-extrabold text-black">
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
            {currentQuestion.options.map((i, index) => (
              <>
                <div className="col-6 mb-3">
                  <button
                    className="buttons w-100 q font-extrabold"
                    onClick={() => select(i)}>
                    <motion.div
                      key={animationKey}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index == 0 ? 0 : index * 0.19,
                      }}>
                      {i.option.split("")[0].toUpperCase() +
                        i.option.split("").slice(1).join("")}
                    </motion.div>
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between my-4">
        <p className="font-extrabold">Segítség</p>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => window.location.reload()}>
            Újrakezd
          </button>
        </div>
      </div>
      <div className="d-flex justify-content-center my-3">
        {helps.map((i) => (
          <button
            className={`buttons mx-2 ${
              i.used ? "bg-secondary" : ""
            } buttons w-100 font-extrabold`}
            onClick={() => HandleHelps(i.id)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}>
              {" "}
              {i.name}
            </motion.div>
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
