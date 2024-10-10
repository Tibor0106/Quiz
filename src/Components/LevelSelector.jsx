import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";
function LevelSelector() {
  const { QuizData, HandleSelectLevel } = useContext(QuizContext);

  return (
    <>
      <h3 className="text-center mb-4">Válassz szintet!</h3>
      <hr className="mx-5 my-3" />
      <div className="row">
        {QuizData["difficulty_levels"].map((i) => (
          <div className="col-5 mx-auto">
            <button
              className="buttons w-100 mb-4"
              onClick={() => HandleSelectLevel(i.level)}>
              {i.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default LevelSelector;
