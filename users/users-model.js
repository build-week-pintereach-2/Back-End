const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findBy,
    add,
    findById,
    findUserPins,
    findPins,
    pinToProfile
}

function find() {
    return db('users');
}

function findBy(filter) {
    return db('users')
    .where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
    .where({ id })
    .first();
}

function findUserPins(id) {
    return db('pins')
    .select('title', 'author', 'category')
    .from('pins as p')
    .innerJoin('user_pins', 'p.id', 'user_pins.pin_id')
    .innerJoin('users as u', 'u.id', 'user_pins.user_id')
    .where('u.id', id);
}

function findPins() {
    return db('pins');
}

//user pins an article(pin) to their profile 
async function pinToProfile(newPin) {
   const [id] = await db('user_pins').insert(newPin);

   return findById(id);
}