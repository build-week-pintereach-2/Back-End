const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../auth/generateToken.js');


const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

const Users = require('../users/users-model.js');

router.post('/', (req, res) => {
    let {username, password} = req.body;
    
    //make sure they exist
    Users.findBy({ username })
    .first()
    .then(user => {
       
        if(user && bcrypt.compareSync(password, user.password)){
            //if they exist and match, give token
            const token = generateToken(user);
            console.log('token', token); //make sure token works
            res.status(201).json({ message: 'Logged in', token: token });

        } else {
            res.status(401).json({ message: "Wrong username or password" });
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


module.exports = router;