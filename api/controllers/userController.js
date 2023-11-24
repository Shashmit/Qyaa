const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const sessionInfo = req.session;
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ response: "User Does Not Exists!" });
    }
    const isValid = await bcrypt.compare(password, userExists.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ response: "Wrong User Password!", isLoggedIn: false });
    }
    sessionInfo.isLoggedIn = true;
    sessionInfo.name = userExists.name;
    sessionInfo.email = userExists.email;
    return res.status(200).json({
      name: sessionInfo.name,
      isLoggedIn: sessionInfo.isLoggedIn,
      response: "User Authenticated Successfully!!",
      userId: userExists._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: "Login Working!!" });
  }
}
async function registerController(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      return res.status(403).json({ response: "User Already Exists!" });
    }
    const newUser = new UserModel({ name, email });
    bcrypt.hash(password, 10, async (err, hashedPass) => {
      newUser.set("password", hashedPass);
      await newUser.save();
      next();
    });
    return res.status(200).json({ response: "User Registered Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: "Error Registering User!!" });
  }
}

function checkAuthController(req, res) {
  try {
    if (req.session.isLoggedIn)
      return res.status(200).json({
        name: req.session.name,
        isLoggedIn: req.session.isLoggedIn,
        response: "User Session Active!",
      });
    else
      return res
        .status(200)
        .json({ isLoggedIn: false, response: "User Logged out!" });
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
}

function logoutController(req, res) {
  try {
    req.session.destroy((err) => {
      if (err)
        res.sendStatus(400);
      else
        res.status(200).json({
          isLoggedIn: false,
          response: "User Logged Out Successfully!",
        });
    });
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
}

module.exports = {
  loginController,
  registerController,
  checkAuthController,
  logoutController,
};
