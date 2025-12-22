const Recipe = require("../models/recipe");
const getRecipes = async (req, res) => {
  const recipe = await Recipe.find();
  return res.json(recipe);
};

const getRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    res.json({ message: "Please fill all required fields" });
  }

  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    time,
  });
  return res.json(newRecipe);
};
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipe = await Recipe.findById(req.params.id);
  try {
    if (recipe) {
      await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json({ title, ingredients, instructions, time });
    }
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};

const deleteRecipe = (req, res) => {
  res.json({ message: "delete recipe" });
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
