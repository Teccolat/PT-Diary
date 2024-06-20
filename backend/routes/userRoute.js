var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose =require('mongoose')
const bcrypt = require("bcryptjs")
const {
  checkJWTToken,
  changePasswordVerification,
  checkUsername,
  checkContentJson,
} = require("./middleware");


// Create a new user on the backend
const createNewUser = async(req,res)=>{
  // console.log(req)
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    console.log("password", password);
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword;
    console.log("Hashpassword", req.body.password);
    const newuser = new User(req.body);
    console.log(newuser);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
}

  // Autheneticate a new user to login
  const loginUser = async (req, res) => {
    //check if user exist by checking their email from the request bocy
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exists", success: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(200)
          .send({ message: "password is incorrect", success: false });
      } else {
        const token = jwt.sign(
          {
            id: user._id,
            roleType: user.roleType
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          // console.log('Token', token)
        );
        return res
          .status(200)
          .send({ message: "Login successful", success: true, data: token });
      }
    } catch (error) {
      console.log(error)
      res
      .status(500)
      .send({ message: "Error login", success: false, error });
    }
  };

  // verify token 
  const verify= async (req, res) => {
    //check if user exist by checking their email from the request body
    console.log(req.body)
    try {
      const user = await User.findOne({ _id: req.body.userId });
      console.log(user)
      if (!user) {
        return res
          .status(200)
          .send({ message: "User does not exists", success: false });
      }else {
        return res
          .status(200)
          .send({ message: "User exists", success: true, data:{name:user.fullName, email:user.email, user_id:user._id, roleType:user.roleType} });
      }} catch (error){
        console.log(error)
        res
        .status(500)
        .send({ message: "Error login", success: false, error });
      }
  }


//   // get all workouts
// const getWorkouts = async (req, res) => {
//   console.log("I'm in get workout",req.body.userId)

//   // const user_id = req.user._id

//   // const user_id = '665dfcc9e63c202eedeb5209'

//    const user_id = req.body.userId
//    const userRoleType = req.body.userRoleType
   
//    if (userRoleType === "client"){
//           const workouts = await Workout.find({client_id: user_id}).sort({createdAt: -1})
//           res.status(200)
//                 .send({ message: "workout", success: true, data: workouts });
//    }else {
//       const workouts = await Workout.find({pt_id: user_id}).sort({createdAt: -1})
//              res.status(200) .send({ message: "workout", success: true, data: workouts });
//    }
// }

// get PT profile for clite profileß
const getUserDetail = async (req, res) => {
  console.log("@@@@@@@@@@@@@@@@@@@getPTUserDetail@@@@@@@@@@@@@@@@@@@",req.params)
  const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404)
      .send({ message: "No Client exist", success: false });
    }

  const user = await User.findById({_id: id})

  if (!user) {
    return res.status(404)
        .send({ message: "No Client exist", success: false });
  }
  
  res.status(200).json(user)
}

// get PT profile for clite profileß
const getUsersDetail = async (req, res) => {

  const users = await User.find({roleType: "client"})

  if (!users) {
    return res.status(404)
        .send({ message: "No Client exist", success: false });
  }
  
  res.status(200).json(users)
}


  /* GET individual user info. */
router.get('/:id', getUserDetail)

router.get('/', getUsersDetail)
//   /* POST users signup. */
// router.GET("/pt/:id", getPTUserDetail)

/* POST users signup. */
router.post("/signup", createNewUser)

// POST users login
router.post("/login",loginUser)

// POST users verification
  
router.post("/get-user-info-by-id",checkJWTToken, verify)

module.exports = router;
