const router = require("express").Router();
require("dotenv").config();
const adminController = require("../controllers/adminController");

router.post("/register", adminController.registerController);
router.post("/login", adminController.loginController);
router.get("/checkAuth", adminController.checkAuthController);
router.post("/logout", adminController.logoutController);
router.post("/getData", adminController.userDataController);

module.exports = router;
