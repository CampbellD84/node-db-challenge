const express = require("express");

const Resources = require("./resource-model");

const router = express.Router();

router.get("/", async (req, res) => {
  const resources = await Resources.getResources();

  try {
    res.json(resources);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not retrieve resources." });
  }
});

router.post("/", async (req, res) => {
  const resourceBody = req.body;
  const newResource = await Resources.addResource(resourceBody);

  try {
    res.status(201).json(newResource);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not add resource." });
  }
});

module.exports = router;
