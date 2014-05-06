var Workout = require('../models/workout').Workout;
var express = require('express');
var router = express.Router();
      
router.get('/',function(req, res) {
  Workout.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { workouts: docs });
    } else {
      res.json(500, { message: err });
    }
  });
});

router.put('/',function(req, res) {
      
  var workout_name = req.body.workout_name; // Name of workout.
  var description = req.body.workout_description; // Description of the workout
    console.log(workout_name +":"+description);
	Workout.findOne({ name: { $regex: new RegExp(workout_name, "i") } },
	function(err, doc) { // Using RegEx - search is case insensitive
	    if(!err && !doc) {
	      
	      var newWorkout = new Workout();
	      
	      newWorkout.name = workout_name;
	      newWorkout.description = description;
	      
	      newWorkout.save(function(err) {
	      
	        if(!err) {
	          res.json(201, {message: "Workout created with name: " +
	newWorkout.name });
	        } else {
	          res.json(500, {message: "Could not create workout. Error: " + err});
	        }
	      
	      });
	      
	    } else if(!err) {
	      
	      // User is trying to create a workout with a name that
	      // already exists.
	      res.json(403, {message: "Workout with that name already exists, please update instead of create or create a new workout with a different name."});
	    } else {
	      res.json(500, { message: err});
	    }
	  });
      
});

module.exports = router;