const prisma = require('../../lib/db');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    let refresh_token;
    if (cookies && cookies.token) {
        refresh_token = cookies.refresh_token;
    } else {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (authHeader) {
            refresh_token = authHeader.split(' ')[1];
            console.log("use header 'Authorization + Logout'")
        }
    }
    console.log(refresh_token);
    if (!refresh_token) {
        return res.sendStatus(401); // Unauthorized
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                refresh_token: refresh_token,
            }
        });
        console.log(user);
        if (!user) {
            return res.sendStatus(403); // Forbidden
        }
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refresh_token: null 
            }
        });
        // res.clearCookie('refresh_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        console.error('Error logging out:', error);
        return res.sendStatus(500); // Internal Server Error
    }
};

module.exports = { handleLogout };
