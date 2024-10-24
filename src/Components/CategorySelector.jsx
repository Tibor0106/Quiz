import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";
function CategorySelector() {
  const { QuizData, HandleSelectCategory, level, category } =
    useContext(QuizContext);

  return (
    <>
      <h3 className="text-center mb-4">Válassz témát!</h3>
      <hr className="mx-5 my-3" />
      <div className="row">
        {QuizData["categories"].map((i, index) => (
          <div className="col-4 mx-auto my-2">
            <button className="buttons" onClick={() => HandleSelectCategory(i)}>
              {i.name} (
              {
                QuizData["questions"].filter(
                  (i) => i.level == level && i.categoryId == index + 1
                ).length
              }
              )
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default CategorySelector;
