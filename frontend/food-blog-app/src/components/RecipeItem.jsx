import React from "react";
import { useLoaderData } from "react-router-dom";
import foodImg from "../assets/food2.png";
import { FaStopwatch } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

export default function RecipeItem() {
  const allRecipes = useLoaderData();
  console.log(allRecipes);
  return (
    <>
      <div className="card-container">
        {allRecipes.map((item, index) => {
          return (
            <div key={index} className="card">
              <img src={`https://localhost:5000/images/${item.coverImage}`} width="120px" height="100px" />
              <div className="card-body">
                <div className="title">{item.title}</div>
                <div className="icons">
                  <div className="timer">
                    30min
                    <FaStopwatch />
                  </div>
                  <FaHeart />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
