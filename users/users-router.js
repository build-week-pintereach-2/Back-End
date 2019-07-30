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

router.get('/:id/pins', authenticate, (req, res) => {
    const { id } = req.params;

    Users.findUserPins(id)
    .then(pins => {
        res.json(pins);
    })
    .catch(err => {
        res.status(500).json({ message: 'Could not retrieve pins' });
    })
}) 

router.get('/pins', authenticate, (req, res) => {
    Users.findPins()
    .then(pins => {
        res.json(pins);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error while displaying pins'});
    })
})

router.post('/:id/pins', authenticate, (req, res) => {
    //const { id } = req.params; //this is the user_pins db id? 
    const newPin = req.body;
    

    Users.pinToProfile(newPin)
    .then(pin => {
        console.log(pin);
        res.status(201).json(pin);
    })
    .catch(err => {
        res.status(500).json({ message: 'error adding that pin to profile' });
    })
})
module.exports = router;