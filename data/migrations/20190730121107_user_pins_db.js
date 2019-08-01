
exports.up = function(knex) {
  return knex.schema.createTable('user_pins', tbl => {
      tbl.increments();

      tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
      tbl
        .integer('pin_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('pins')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');          
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_pins');
};
