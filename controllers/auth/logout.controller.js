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
    if (!refresh_token) {
        return res.sendStatus(401); // Unauthorized
    }
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                refresh_token: refresh_token,
            }
        });
        if (!user) {
            return res.status(403); 
        }
        await prisma.user.update({
            where: {
                refresh_token: refresh_token
            },
            data: {
                refresh_token: ' '
            }
        });
        // res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        console.error('Error logging out:', error);
        res.sendStatus(500); 
    }
};

module.exports = { handleLogout };
