exports.up = function(knex) {
  return knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.string("description");
    tbl
      .boolean("completed")
      .notNullable()
      .defaultTo(false);
    tbl
      .integer("resource_id")
      .references("id")
      .inTable("resources");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects");
};
