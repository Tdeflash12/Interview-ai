const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklist.model");
/**
 * @name    registerUserController
 * @description Registers a new user, hashes the password, generates a JWT token, and sets it in an HTTP-only cookie.
 * @access public
 * @route   POST /api/auth/register 
 */
async function registerUserController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User already exists with the same username or email",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // create and persist user
  let user;
  try {
    user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Failed to create user" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET not configured" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, { httpOnly: true });
  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
/**
 * name    loginUserController
 * @description Authenticates a user, generates a JWT token, and sets it in an HTTP-only cookie.
 * @access public
 * @route   POST /api/auth/login
 
 */
async function loginUserController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password or email"
        })
        
    }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET not configured" });
  }
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({
    message:"User LoggedIn Successfully.",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
    
         
    
  })
}
/**
 * @name    logoutUserController
 * @description Logs out the user by blacklisting the token and clearing the cookie.
 * @access public
 * @route   GET /api/auth/logout
 * @returns {Object} JSON response with a success message.

 */
async function logoutUserController(req, res) {
  const token = req.cookies.token;
  if (token) {
    await blackListTokenModel.create({ token });
  }
  

  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
}
/**
 * @name    getMeController
 * @description Retrieves the authenticated user's information based on the JWT token.
 * @access private
 * @route   GET /api/auth/get-me
 
 */
async function getMeController(req, res) {
  const userId = req.user?.userId || req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user= await userModel.findById(userId).select("-password");
    if(!user){
        return res.status(404).json({   message: "User not found" });
    }
    return res.status(200).json({
        message:"User Details Fetched Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

module.exports = { registerUserController, loginUserController, logoutUserController,getMeController }
