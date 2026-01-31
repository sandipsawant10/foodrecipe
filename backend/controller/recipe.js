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

  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file.filename,
      createBy: req.user.id,
    });
    return res.json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    return res
      .status(500)
      .json({ message: "Error creating recipe", error: error.message });
  }
};
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipe = await Recipe.findById(req.params.id);
  try {
    if (recipe) {
      let coverImage = req.file?.filename
        ? req.file.filename
        : recipe.coverImage;
      await Recipe.findByIdAndUpdate(
        req.params.id,
        { ...req.body, coverImage },
        { new: true },
      );
      res.json({ title, ingredients, instructions, time });
    }
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (error) {
    return res.status(400).json({ message: "Error deleting recipe" });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
