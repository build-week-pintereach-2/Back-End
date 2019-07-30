
exports.up = function(knex) {
  return knex.schema.createTable('pins', tbl => {
      tbl.increments();

      tbl
        .string('title')
        .notNullable();
      tbl
        .string('link');
      tbl
        .string('category')
        .notNullable();
      tbl
        .string('author')
        .notNullable();  
    
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pins');
};
