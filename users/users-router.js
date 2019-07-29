const router = require('express').Router();

const Users = require('./users-model.js');
const { authenticate } = require('../auth/authenticate.js')

router.get('/', authenticate, (req, res) => {
    Users.find()
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;