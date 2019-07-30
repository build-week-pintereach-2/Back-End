
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pins').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('pins').insert([
        { title: 'Humanism in the Modern Age', link: '', category: 'Social Studies', author: 'Karina Kalpaxis'},
        { title: 'UI and You', link: '', category: 'Web Design', author: 'Iris Jitomo'},
        { title: 'Dirt and the Immune System', link: '', category: 'Medicine', author: 'Micah Jones'},
        { title: 'Getting Over Writers Block', link: '', category: 'Literature', author: 'Carla Marvin'},
        { title: 'A Study in Democracy', link: '', category: 'Social Studies', author: 'George Washington'},
        { title: 'An Imaganitive Mind', link: '', category: 'Literature', author: 'J.R.R. Tolkien'},
        { title: 'How Radiation can Save You', link: '', category: 'Medicine', author: 'Albert Einstein'}
      ]);
    });
};


//DASH - shows list of articles not yet pinned - This DB (pins)
//PROFILE - shows list of articles that have been pinned by user - join this and users