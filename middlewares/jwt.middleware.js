const jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = data;
        next();
    })
}

module.exports = verifyJWT;