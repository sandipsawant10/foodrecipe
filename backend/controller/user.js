const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashpwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashpwd,
  });
  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
  return res.status(200).json({ token, user: newUser });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    return res.status(200).json({ token, user });
  } else {
    return res.status(400).json({ message: "Invalid credentials" });
  }
};

const getUser = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ email: user.email });
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(500).json({ message: "Error getting user" });
  }
};

module.exports = { userSignUp, userLogin, getUser };
