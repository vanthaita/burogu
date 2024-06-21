const jwt = require('jsonwebtoken');


const verifyJWT = async (req, res, next) => {
    const cookies = req.cookies;
    let token;
    // console.log(cookies);
    // if (cookies && cookies.token) {
    //     token = cookies.token;
    // } else {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (authHeader) {
            token = authHeader.split(' ')[1];
            console.log("use header 'Authorization'")
        }
    // }
    console.log(token)
    if (!token) {
        return res.sendStatus(401); // Unauthorized
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