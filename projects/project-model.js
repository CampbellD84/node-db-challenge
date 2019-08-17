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

await function addProject(project) {
  const [id] = db("projects").insert(project);
  return getProjectById(id);
};
