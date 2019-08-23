const db = require("../data/db-config");

module.exports = {
  addProject,
  addTask,
  findProjects,
  findProjectsById,
  findTasks,
  findTaskById,
  addResource,
  findResources
};

function findProjects() {
  return db("projects");
}

function findProjectsById(id) {
  return db("projects").where({ id });
}

function findTasks(id) {
  return db("tasks as t")
    .join("projects as p", "project_id", "p.id")
    .select("p.*", "t.*")
    .where("project_id", id);
}

async function addProject(project) {
  const [id] = await db("projects").insert(project);
  return db("projects").where({ id });
}

function findTaskById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

async function addTask(task, project_id) {
  const [id] = await db("tasks").insert({ ...task, project_id });
  return findTaskById(id);
}

function findResources() {
  return db("resources");
}

function findResourceById(id) {
  return db("resources")
    .where({ id })
    .first();
}

async function addResource(resource, project_id) {
  const [id] = await db("resources").insert({ ...resource, project_id });
  return findResourceById(id);
}
