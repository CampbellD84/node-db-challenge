const express = require("express");
const Projects = require("./project-model");

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Projects.findProjects();

  try {
    const changeBoolean = projects.map(pj => {
      if (pj.completed === 1) {
        pj.completed = true;
      } else {
        pj.completed = false;
      }
      return pj;
    });

    if (projects.length) {
      res.json(changeBoolean);
    } else {
      res.status(400).json({ message: "No Projects in the pipeline." });
    }
  } catch ({ err }) {
    res.status(500).json({ err, message: "Cannot get projects." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await Projects.findProjectsById(id);

  try {
    const changeBoolean = project.map(pj => {
      if (pj.completed === 1) {
        pj.completed = true;
      } else {
        pj.completed = false;
      }
      return pj;
    });
    res.json(changeBoolean);
  } catch ({ err }) {
    res
      .status(500)
      .json({ err, message: `Could not find project with the id of ${id}.` });
  }
});

// router.get("/:id/resources", async (req, res) => {});

router.get("/:id/tasks", async (req, res) => {
  const { id } = req.params;
  const tasks = await Projects.findTasks(id);

  try {
    const changeTaskBoolean = tasks.map(tk => {
      if (tk.completed === 1) {
        tk.completed = true;
      } else {
        tk.completed = false;
      }
      return tk;
    });
    res.json(changeTaskBoolean);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not get tasks." });
  }
});

router.get("/:id/resources", async (req, res) => {
  const { id } = req.params;
  const resources = await Projects.findResources(id);

  try {
    res.json(resources);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not retrieve resources." });
  }
});

router.post("/", async (req, res) => {
  const projectBody = req.body;

  if (!projectBody.completed) {
    projectBody.completed = false;
  }

  try {
    if (projectBody.name) {
      const newProject = await Projects.addProject(projectBody);
      if (newProject) {
        res.status(201).json(newProject);
      } else {
        res.status(400).json({
          message: "Please fill out all required information."
        });
      }
    }
  } catch ({ err }) {
    res.status(500).json({ err, message: "Cannot add project." });
  }
});

router.post("/:id/tasks", async (req, res) => {
  const task = req.body;
  const { id } = req.params;

  const newTask = await Projects.addTask(task, id);

  try {
    res.json(newTask);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not add task." });
  }
});

router.post("/:id/resources", async (req, res) => {
  const resource = req.body;
  const { id } = req.params;

  const newResource = await Projects.addResource(resource, id);

  try {
    res.json(newResource);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not add resource." });
  }
});

module.exports = router;
