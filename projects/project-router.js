const express = require("express");
const Projects = require("./project-model");

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Projects.getProjects();

  try {
    res.json(projects);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Cannot get projects." });
  }
});

router.post("/", async (req, res) => {
  const projectBody = req.body;
  const newProject = await Projects.addProject(projectBody);

  try {
    res.status(201).json(newProject);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Cannot add project." });
  }
});

module.exports = router;
