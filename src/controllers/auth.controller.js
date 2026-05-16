const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  const token = jwt.sign(
    {id:user._id,
        username:user.username},
    process.env.JWT_SECRET,
     {expiresIn:"1d"}
  )
  res.cookie("token",token)
  res.status(200).json({
    message:"User LoggedIn Successfully.",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
    
         
    
  })
}

module.exports = { registerUserController,loginUserController}
