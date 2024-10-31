import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";
function CategorySelector() {
  const { QuizData, HandleSelectCategory, level, category } =
    useContext(QuizContext);

  return (
    <>
      <h2 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Válassz témát!
      </h2>
      <hr className="mx-5 my-3" />
      <div className="row">
        {QuizData["categories"].map((i, index) => (
          <div className="col-3 mx-auto my-2">
            <button
              className="buttons w-100 font-extrabold"
              onClick={() => HandleSelectCategory(i)}>
              {i.name}
              {/*
                QuizData["questions"].filter(
                  (i) => i.level == level && i.categoryId == index + 1
                ).length
              */}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default CategorySelector;
