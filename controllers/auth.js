const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ success: true, newUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(401)
      .json({ success: false, error: "Please fill out email or password" });
  }

  try {
    const user = await User.findOne({ email }).select("password");

    if (!user) {
      res.status(404).json({ success: false, error: "There's no such email" });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, error: "Password is wrong Credentials" });
    }

    res.status(200).json({ success: true, user, token: "123123" });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = (req, res, next) => {
  res.send("forgotPassword routes");
};

exports.resetPassword = (req, res, next) => {
  res.send("resetPassword routes");
};
