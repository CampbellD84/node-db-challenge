exports.up = function(knex) {
  return knex.schema.createTable("tasks", tbl => {
    tbl.increments();
    tbl.string("description").notNullable();
    tbl.string("notes");
    tbl
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
    tbl
      .integer("project_id")
      .references("id")
      .inTable("projects");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tasks");
};
