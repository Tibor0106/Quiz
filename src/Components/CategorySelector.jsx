import { useContext, useEffect } from "react";
import { QuizContext } from "../Providers/QuizProvider";
function CategorySelector() {
  const { QuizData, HandleSelectCategory } = useContext(QuizContext);

  return (
    <>
      <h3 className="text-center mb-4">Válassz témát!</h3>
      <hr className="mx-5 my-3" />
      <div className="row">
        {QuizData["categories"].map((i) => (
          <div className="col-4 mx-auto my-2">
            <button className="buttons" onClick={() => HandleSelectCategory(i)}>
              {i.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default CategorySelector;
