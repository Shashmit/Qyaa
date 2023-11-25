const UserModel = require("../models/adminModel");
const UserDetails = require("../models/userDetailModel");
const bcrypt = require("bcryptjs");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const sessionInfo = req.session;
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ response: "Admin Does Not Exists!" });
    }
    const isValid = await bcrypt.compare(password, userExists.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ response: "Wrong Admin Password!", isLoggedIn: false });
    }
    sessionInfo.isLoggedIn = true;
    sessionInfo.hotel_name = userExists.hotel_name;
    sessionInfo.email = userExists.email;
    return res.status(200).json({
      hotel_name: sessionInfo.hotel_name,
      isLoggedIn: sessionInfo.isLoggedIn,
      response: "Admin Authenticated Successfully!!",
      userId: userExists._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: "Login Working!!" });
  }
}
async function registerController(req, res, next) {
  try {
    const { hotel_name, address, email, password } = req.body;
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      return res.status(403).json({ response: "Admin Already Exists!" });
    }
    const newUser = new UserModel({ hotel_name, email, address });
    bcrypt.hash(password, 10, async (err, hashedPass) => {
      newUser.set("password", hashedPass);
      await newUser.save();
      next();
    });
    return res.status(200).json({ response: "Admin Registered Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ response: "Error Registering Admin!!" });
  }
}

function checkAuthController(req, res) {
  try {
    if (req.session.isLoggedIn)
      return res.status(200).json({
        hotel_name: req.session.name,
        isLoggedIn: req.session.isLoggedIn,
        response: "Admin Session Active!",
      });
    else
      return res
        .status(200)
        .json({ isLoggedIn: false, response: "Admin Logged out!" });
  } catch (err) {
    console.log(err);
    return res.status(400);
  }
}

function logoutController(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) res.status(400);
      else
        res.status(200).json({
          isLoggedIn: false,
          response: "Admin Logged Out Successfully!",
        });
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
}

async function userDataController(req, res) {
  try {
    const userId = req.body.userId;
    const email = req.body.email;
    const userExists = await UserDetails.findOne({ userId });
    if (!userExists) {
      return res
        .status(500)
        .json({ response: "User Aadhaar not verified Yet!" });
    }
    const storedata = userExists.aadhaarDetails.data.data;
    const user = await UserModel.findOne({ email });
    if (user) {
      user.userLogs.push(storedata);
      await user.save();
    }
    res.status(200).send({ storedata });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

module.exports = {
  loginController,
  registerController,
  checkAuthController,
  logoutController,
  userDataController,
};
