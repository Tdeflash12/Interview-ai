const {Router} = require('express');
const authMiddleware=require("../middleware/auth.middleware")
const authController=require("../controllers/auth.controller")

const authRouter= Router();
authRouter.post('/register',authController.registerUserController)
authRouter.post('/login',authController.loginUserController)
authRouter.get('/logout',authController.logoutUserController)
authRouter.get('/get-me',authMiddleware.authUser,authController.getMeController)
module.exports = authRouter;