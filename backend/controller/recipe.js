const Recipe = require("../models/recipe");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
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
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    time,
    coverImage: req.file.filename,
    createBy: req.user.id
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

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
