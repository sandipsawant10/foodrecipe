const express = require("express");
const {
  getRecipes,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require("../controller/recipe");
const router = express.Router();

router.get("/", getRecipes); //Get all recipes
router.get("/:id", getRecipes); //Get recipe by ID
router.post("/:id", addRecipe); //Add a new recipe
router.put("/:id", editRecipe); //Edit a recipe
router.delete("/:id", deleteRecipe); //Delete a recipe

module.exports = router;
