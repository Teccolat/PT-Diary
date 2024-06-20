var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
const Workout = require("../models/workoutModel");
const mongoose =require('mongoose')
const bcrypt = require("bcryptjs")
const {
  checkJWTToken,
} = require("./middleware");



// get all workouts
const getWorkouts = async (req, res) => {
  console.log("I'm in get workout",req.body.userId)

  // const user_id = req.user._id

  // const user_id = '665dfcc9e63c202eedeb5209'

   const user_id = req.body.userId
   const userRoleType = req.body.userRoleType
   
   if (userRoleType === "client"){
          const workouts = await Workout.find({client_id: user_id}).sort({createdAt: -1})
          res.status(200)
                .send({ message: "workout", success: true, data: workouts });
   }else {
      const workouts = await Workout.find({pt_id: user_id}).sort({createdAt: -1})
      // const workouts_client_ids= await Workout.find({pt_id: user_id}).distinct('client_id').sort({createdAt: -1})
      // const workouts_list_ids = await Workout.find({pt_id: user_id}).distinct('_id').sort({createdAt: -1})
       const workoutSummary =await Workout.aggregate( [
          {$match: {pt_id: user_id}},
          {
            $group: {_id: "$client_id", totalCount: { $sum: 1 } }
          }
      ])

             res.status(200).send({ message: "workout summary", success: true, data: workouts, workoutSummary:workoutSummary});
   }
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404)
    .send({ message: "No such workout", success: false });
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404)
        .send({ message: "No such workout", success: false });
  }
  
  res.status(200).json(workout)
}


// create new workout
const createWorkout = async (req, res) => {
  const {title, load, reps, client_id, pt_id} = req.body
  console.log(req.body)

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400)
        .send({ message: "Please fill in all the fields",emptyFields, success: false });
  }

  // add doc to db
  try {
    const user_id = req.body.userId
    const workout = await Workout.create({title, load, reps,client_id, pt_id})
    res.status(200).json(workout)
  } catch (error) {
    return res.status(400)
    .send({ message: error.message, success: false });
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  console.log("I'm in delete method")

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404)
    .send({ message:"No such workout", success: false });
  }

  const workout = await Workout.findOneAndDelete({_id: id})
  console.log(workout)

  if (!workout) {
    return res.status(400)
    .send({ message:"No such workout", success: false });}
  res.status(200).json(workout)
}




// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404)
        .send({ message: "No such workout", success: false });
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400)
        .send({ message: "No such workout", success: false });
  }

  res.status(200).status(200)
        .send({ message: "success workout", success: true, data: workout});
}

// GET all workouts
router.get('/api/workout/clientID', getWorkouts)



// GET all workouts
router.get('/', checkJWTToken,getWorkouts)

//GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)


module.exports = router