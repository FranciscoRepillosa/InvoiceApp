var express = require('express')
var router = express.Router()

const userController = require("./controllers/user.controller");
const authController = require("./controllers/auth.controller");

router.post('/signup', authController.signup);

// router.get("/coinfer", authController.protect, authController.restricTo(["master"]), userController.showCoinFer);

router.post("/login", authController.login)

router.get("/login", userController.getLoginForm);

// router.get("/", authController.protect ,userController.getUsers);

router.get("/signup", userController.getSignupForm);

// router.get("/test", authController.protect, userController.test);

// router.get("/homepage", authController.protect, userController.grtHomePage)

// router.post("/changeRole", authController.protect, /*authController.restricTo(["master"]),*/ userController.changeUserRole)

// router.get("/changeRole", authController.protect, /*authController.restricTo(["master"]),*/ userController.renderChangeRolePage)

router.get("/logout", authController.logout);

router.get("/extendSession", authController.extendSession);

router.get("/checkSession", authController.checkSession);

module.exports = router