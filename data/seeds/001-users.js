
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'test', email: 'test@test.com', password: 'test'},
        { username: 'frodo', email: 'frodo@shire.net', password: 'pass'},
        { username: 'sam', email: 'sam@shire.net', password: 'pass'}
      ]);
    });
};
