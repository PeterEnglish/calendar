const router = require("express").Router();
const dayTasks = require("../models/Day");
const mongoose = require("mongoose");

//CREATE Day
router.post("/", async (req, res) => {
  console.log(mongoose.connection.readyState)
  console.log(req.body)
  const newDayTasks = new dayTasks(req.body);
  console.log(newDayTasks);
  try {
    console.log(newDayTasks)
    
    const savedDayTask = await newDayTasks.save();
    res.status(200).json(savedDayTask);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE Day
router.put("/:id", async (req, res) => {
  try {
    console.log("Toggle Done Being Run")
      try {
        const updatedPost = await Day.findOneAndUpdate(
          {_id:req.params.id},
          [ { "$set": { "done": { "$eq": [false, "$done"] } } } ]
        );
        console.log("Response being sent from update")
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
  } catch (err) {
    res.status(500).json(err);
  }
});



//DELETE Day
router.delete("/:id", async (req, res) => {
  try {
    const Day = await Day.findById(req.params.id);
    
      try {
        await Day.delete();
        res.status(200).json("Day has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }

  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Day
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL Days
router.get("/", async (req, res) => {
  console.log('Running GET Days')
  try {
    let Days = await Day.find();
    
    res.status(200).json(Days);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
