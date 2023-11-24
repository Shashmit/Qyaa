const router = require("express").Router();
require("dotenv").config();
const userController = require("../controllers/userController");
const userDetailsController = require("../controllers/userDetailsController");

router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.get("/checkAuth", userController.checkAuthController);
router.post("/logout", userController.logoutController);
router.get(
  "/initializeSession",
  userDetailsController.initiateSessionController
);
router.post("/saveAadhaar", userDetailsController.getAadhaarController);

module.exports = router;
