const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');


router.post('/', (req, res) => {
    const user = req.body;
    if(!user.email || !user.username || !user.password){
        res.status(400).json({ message: "Please provide username, email and pw" });
    } else {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash; //pw is now the hash
    
        Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }

})

module.exports = router;