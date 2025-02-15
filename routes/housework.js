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
  const { taskName, assignee, dueDate, status, priority, score } = req.body;
  const existingTask = await Housework.findOne({ taskName });
  if (existingTask) {
    return res.status(409).json({ message: "Task name already exists." });
  }
  const housework = new Housework({
    taskName,
    assignee,
    dueDate,
    status,
    priority,
    score,
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
  const { taskName, assignee, dueDate, status, priority, score } = req.body;
  if (taskName != null) {
    res.housework.taskName = taskName;
  }
  if (assignee != null) {
    res.housework.assignee = assignee;
  }
  if (dueDate != null) {
    res.housework.dueDate = dueDate;
  }
  if (status != null) {
    res.housework.status = status;
  }
  if (priority != null) {
    res.housework.priority = priority;
  }
  if (score != null) {
    res.housework.score = score;
  }
  try {
    const updateHousework = await res.housework.save();
    res.json(updateHousework);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//PUT
router.put("/:id", getHouseworkByID, async (req, res) => {
  const { taskName } = req.body;
  const newHousework = req.body;
  try {
    // check wether the studentID is exsit or not
    const existingTask = await Housework.findOne({ taskName });
    if (existingTask) {
      const updatedHousework = await res.housework.save();
      res.json({
        message: "Housework updated successfully",
        housework: updatedHousework,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `An error occured: ${err.message}`,
    });
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
      return res.status(404).json({ message: "Housework does not exist." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.housework = housework;
  // next allows to move to the next middleware or next actual request
  next();
}

module.exports = router;
