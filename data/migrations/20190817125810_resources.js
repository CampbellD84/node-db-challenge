exports.up = function(knex) {
  return knex.schema.createTable("resources", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl.string("description");
    tbl
      .integer("project_id")
      .references("id")
      .inTable("projects");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("resources");
};
