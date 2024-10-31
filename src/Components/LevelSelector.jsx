import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";
function LevelSelector() {
  const { QuizData, HandleSelectLevel } = useContext(QuizContext);
  useEffect(() => {});
  return (
    <>
      <h2 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Válassz szintet!
      </h2>
      <hr className="mx-5 my-3" />
      <div className="row">
        {QuizData["difficulty_levels"].map((i, index) => (
          <div className="col-5 mx-auto">
            <button
              className="buttons w-100 mb-4 font-extrabold"
              onClick={() => HandleSelectLevel(i.level)}>
              {i.name}
              {/* QuizData["questions"].filter((i) => i.level == index + 1).length*/}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default LevelSelector;
