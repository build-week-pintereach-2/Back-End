const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('../users/users-router.js');
const registerRouter = require('../register/register-router.js');
const loginRouter = require('../login/login-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/users', usersRouter);
server.use('/register', registerRouter);
server.use('/login', loginRouter);

//make sure server is alive
server.get('/', (req, res) => {
    res.send("It's alive!");
});

module.exports = server;