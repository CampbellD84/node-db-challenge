const express = require("express");
const Tasks = require("./task-model");

const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await Tasks.getTasks();

  try {
    res.json(tasks);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Cannot get tasks." });
  }
});

router.post("/", async (req, res) => {
  const taskBody = req.body;
  const newTask = await Tasks.addTask(taskBody);

  try {
    res.status(201).json(newTask);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Cannot add task." });
  }
});

module.exports = router;
