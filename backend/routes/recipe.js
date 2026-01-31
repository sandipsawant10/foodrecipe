const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
} = require("../controller/recipe");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/", getRecipes); // Get all recipes
router.get("/:id", getRecipe); // Get recipe by ID
router.post("/", upload.single("file"), verifyToken, addRecipe); // Add a new recipe
router.put("/:id", editRecipe); // Edit a recipe
router.delete("/:id", deleteRecipe); // Delete a recipe

module.exports = router;
