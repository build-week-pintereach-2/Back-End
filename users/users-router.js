const router = require('express').Router();

const Users = require('./users-model.js');
const { authenticate } = require('../auth/authenticate.js');
const { verifyInfo } = require('../auth/verify-info.js');

//get all users
router.get('/', authenticate, (req, res) => {
    Users.find()
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

//get specifc user
router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;
    Users.findById(id)
    .then(user => {
        if(user){
        res.json(user);
        } else {
            res.status(404).json({ message: 'Could not find user with that id' });
        }
    })
    .catch(err => {
        res.status(500).json({message: 'could not show user'})
    })
})
//get user pins
router.get('/:id/pins', authenticate, (req, res) => {
    const { id } = req.params;

    Users.findUserPins(id)
    .then(pins => {
        if(pins) {
         res.json(pins);
        } else {
            res.status(404).json({ message: "Pin ID not found" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Could not retrieve pins' });
    })
}) 

//get all pins
router.get('/pins/dashboard', (req, res) => {
    Users.findPins()
    .then(pins => {
        res.json(pins);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error while displaying pins'});
    })
})

//add pin to user profile
router.post('/:id/pins', authenticate, (req, res) => {
    //const { id } = req.params; //this is the user_pins db id? 
    const newPin = req.body;
    

    Users.pinToProfile(newPin)
    .then(pin => {
        console.log({pin: pin});
        res.status(201).json(pin);
    })
    .catch(err => {
        res.status(500).json({ message: 'error adding that pin to profile' });
    })
})

//delete pin from profile
router.delete('/:id/pins', authenticate, (req, res) => {
    const { id } = req.params;

    Users.removePinFromProfile(id)
    .then(deleted => {
        if(deleted){
        res.json(deleted);
        } else {
            res.status(404).json({ message: "Pin ID not found" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error deleting pin from profile' });
    })
})

//delete user from user db
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users.removeUser(id)
    .then(deleted => {
        if(deleted) {
            res.json(deleted);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    })
})

//update user info
router.put('/:id', authenticate, verifyInfo, (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.updateUser(changes, id)
    .then(updated => {
        if(updated){
            res.json(updated);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Could not update info" });
    })
})




module.exports = router;