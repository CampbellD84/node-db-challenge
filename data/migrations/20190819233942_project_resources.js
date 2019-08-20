exports.up = function(knex) {
  return knex.schema.createTable("projects_resources", tbl => {
    tbl
      .integer("resource_id")
      .references("id")
      .inTable("resources");
    tbl
      .integer("project_id")
      .references("id")
      .inTable("projects");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects_resources");
};
