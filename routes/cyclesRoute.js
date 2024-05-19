const express = require("express");
const router = express.Router();
const Cycle = require("../models/cycleModel");

router.get("/getallcycles", async (req, res) => {
  try {
    const cycles = await Cycle.find();
    res.send(cycles);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addcycle", async (req, res) => {
  try {
    
    const newcycle = new Cycle(req.body);
    
    await newcycle.save();
    res.send("Cycle added successfully");
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

router.post("/editcycle", async (req, res) => {
  try {
    const cycle = await Cycle.findOne({ _id: req.body._id });
    cycle.name = req.body.name;
    cycle.image = req.body.image;
    cycle.rentPerDay = req.body.rentPerDay;
  


    await cycle.save();

    res.send("Cycle details updated successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletecycle", async (req, res) => {
  try {
    await Cycle.findOneAndDelete({ _id: req.body.cycleid });

    res.send("Cycle deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
