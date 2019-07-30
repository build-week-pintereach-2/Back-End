
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_pins').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_pins').insert([
        { user_id: 2, pin_id: 6},
        { user_id: 3, pin_id: 4},
        { user_id: 2, pin_id: 1},
        { user_id: 1, pin_id: 2},
        { user_id: 2, pin_id: 3}
      ]);
    });
};
