const express = require("express");
const helmet = require("helmet");

// const resourcesRouter = require("./resources/resource-router");
const projectsRouter = require("./projects/project-router");
// const tasksRouter = require("./tasks/task-router");

const server = express();

server.use(helmet());
server.use(express.json());

// server.use("/api/resources", resourcesRouter);
server.use("/api/projects", projectsRouter);
// server.use("/api/tasks", tasksRouter);

module.exports = server;
