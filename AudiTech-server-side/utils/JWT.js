//jwt 

const {sign, verify} = require('jsonwebtoken');

//Create Token
function generateToken (user) {
    const accessToken = sign(
        {email : user.email, id : user.userId },
        "IT-IS-A-SECRET-JWT"
    );
    return accessToken;
};

module.exports = { generateToken };

