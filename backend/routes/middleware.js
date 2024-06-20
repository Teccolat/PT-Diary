let jwt = require("jsonwebtoken");
const { decode } = require("punycode");

function checkJWTToken(req, res, next){
    console.log(`I'm in checkJWTToken Middleware`)
    const auth = req.headers["authorization"];
    console.log(req.headers["authorization"])
    const token = auth.split(' ')[1];
    console.log(token)
    if (token){
        // let token = req.headers.token;
        jwt.verify(token, process.env.JWT_SECRET, function(error,decoded){
            if(error){
                console.log(error)
                return res
                .status(401)
                .send({ message: "Auth faild", success: false });
            } else{
              console.log(` I'm in checkJWTJson data`)
              req.body.userId =decoded.id;
              req.body.userRoleType =decoded.roleType;
              next();
            }
        });
    }else {
      return res
      .status(401)
      .send({ message: "Auth faild", success: false });
    }
}

//Function to check if username is avalid gmail email account
function checkUsername(req, res, next) {
    console.log(`I'm in checkUsername Middleware`)
  if (req.body.username.endsWith("@gmail.com")) {
    newUser = {
      username: req.body.username,
      password: req.body.password,
    };
    next();
  } else {

    res.status(403).json({message: "Username need to be a valid gmail email address, 403"});
    next();
  }
}

// check the length of todo task characters 
function checkTaskLength(req, res, next) {
    console.log(`I'm in checkTaskLength Middleware`)
    let task = req.body.task
    console.log(`I'm in checkTaskLength ${task.length }`)
    // console.log(`This is the to do ${task} and length is ${task.length} `)
    if ( task.length <= 140) {
      next();
    } else {
      return res.send({message:"Todo task exceed 140 character",})
      };
    }
    


  // check json content type
function checkContentJson(req, res, next) {
    console.log(`I'm in checkContentJson`)
    const content = req.headers["content-type"];
    console.log(content)
    if (content==="application/json") {
      next();
    } else {
      return res.json({
        Message: "Request is not json content-type",
      });
    }
  }

function changePasswordVerification(req,res,next){
    if(
        req.body.newPassword == req.body.confirmPassword && 
        req.body.newPassword.length >=6
    ){
        req.newUserpassword = req.body.newPassword;
        next();
    } else if (req.body.newPassword.length <6){
        res.send(
            {
                message:' The new password needs to be longer than six characters',
            }
        );
        next();
    } else {
        res.send({
            message: "Conformation Password and New Password does not match"
        });
        next();
    }
}
module.exports={ checkJWTToken,changePasswordVerification, checkUsername, checkTaskLength,checkContentJson};