const db = require("../data/db-config");

module.exports = {
  addTask,
  getTasks
};

function getTasks() {
  // return db("tasks as t")
  //   .join("projects as p", "p.id", "t.project_id")
  //   .select(
  //     "p.name",
  //     "p.description",
  //     "t.notes",
  //     "t.description",
  //     "t.completed"
  //   );
  return db("tasks");
}

// function getTaskById(id) {
//   return db("tasks")
//     .where({ id })
//     .first();
// }

function addTask(task) {
  // const [id] = await db("tasks").insert(task);

  // return getTaskById(id);
  return db("tasks").insert(task);
}
