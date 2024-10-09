import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";
function LevelSelector() {
  const { QuizData, HandleSelectLevel } = useContext(QuizContext);

  return (
    <>
      <div className="d-flex justify-content-between mt-5">
        {QuizData["difficulty_levels"].map((i) => (
          <button
            className="btn btn-primary"
            onClick={() => HandleSelectLevel(i.level)}>
            {i.name} ({i.level})
          </button>
        ))}
      </div>
    </>
  );
}
export default LevelSelector;
