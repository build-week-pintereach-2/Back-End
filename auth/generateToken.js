const jwt = require('jsonwebtoken');
const secrets = require('../auth/secrets.js');

function generateToken(user) {
    console.log('hit');
    const jwtPayload = {
      subject: user.id,
      username: user.username,
    };
  
    
    const jwtOptions = {
      expiresIn: '1d' //1 day 
    }
    return jwt.sign(jwtPayload, secrets.jwtSecret, jwtOptions)
  }

  module.exports = generateToken;