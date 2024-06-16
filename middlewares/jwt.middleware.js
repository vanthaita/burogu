const jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    const cookies = req.cookies;
    console.log('Cookie', cookies);
    if (!cookies?.token) return res.sendStatus(401);

    const token = cookies.token;

    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = data;
        console.log("Passwd verified");
        next();
    })
    
}

module.exports = verifyJWT;