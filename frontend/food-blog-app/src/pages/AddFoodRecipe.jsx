import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
          ? e.target.files[0]
          : e.target.value;

    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/recipe", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/"));
  };
  return (
    <>
      <div className="container">
        <form className="form" onSubmit={onHandleSubmit}>
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              className="title"
              name="title"
              onChange={onHandleChange}
            />
          </div>
          <div className="form-control">
            <label>Time</label>
            <input
              type="text"
              className="input"
              name="time"
              onChange={onHandleChange}
            />
          </div>
          <div className="form-control">
            <label>Ingredients</label>
            <textarea
              className="input-textarea"
              name="ingredients"
              rows="5"
              onChange={onHandleChange}
            />
          </div>
          <div className="form-control">
            <label>Instructions</label>
            <textarea
              className="input-textarea"
              name="instructions"
              rows="5"
              onChange={onHandleChange}
            />
          </div>
          <div className="form-control">
            <label>Image Image</label>
            <input
              type="file"
              className="input"
              name="file"
              onChange={onHandleChange}
            />
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
}

export default AddFoodRecipe;
