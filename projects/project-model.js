const db = require("../data/db-config");

module.exports = {
  addProject,
  getProjects
};

function getProjects() {
  return db("projects");
}

function getProjectById(id) {
  return db("projects")
    .where({ id })
    .first();
}

async function addProject(project) {
  const [id] = await db("projects").insert(project);
  return getProjectById(id);
}
