const express = require("express");
const router = express.Router();
const Housework = require("../models/houseworkModel");

//getting all
router.get("/", async (req, res) => {
  try {
    const housework = await Housework.find();
    res.json(housework);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getHouseworkByID, (req, res) => {
  res.json(res.housework);
});
//creating one
router.post("/", async (req, res) => {
  const housework = new Housework({
    taskName: req.body.taskName,
    assignee: req.body.assignee,
    dueDate: req.body.dueDate,
    status: req.body.status,
    priority: req.body.priority,
    score: req.body.score,
  });
  try {
    const newHousework = await housework.save();
    res.status(201).json(newHousework);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//update one
router.patch("/:id", getHouseworkByID, async (req, res) => {
  if (req.body.taskName != null) {
    res.housework.taskName = req.body.taskName;
  }
  if (req.body.assignee != null) {
    res.housework.assignee = req.body.assignee;
  }
  if (req.body.dueDate != null) {
    res.housework.dueDate = req.body.dueDate;
  }
  if (req.body.status != null) {
    res.housework.status = req.body.status;
  }
  if (req.body.priority != null) {
    res.housework.priority = req.body.priority;
  }
  if (req.body.score != null) {
    res.housework.score = req.body.score;
  }
  try {
    const updateHousework = await res.housework.save();
    res.json(updateHousework);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete one
router.delete("/:id", getHouseworkByID, async (req, res) => {
  try {
    await res.housework.deleteOne();
    res.json({ message: "Deleted Housework." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//middleware for getHousework by id
async function getHouseworkByID(req, res, next) {
  let housework;
  try {
    housework = await Housework.findById(req.params.id);
    if (housework == null) {
      return res.status(404).json({ message: "Cannot find housework" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.housework = housework;
  // next allows to move to the next middleware or next actual request
  next();
}

module.exports = router;
