const prisma = require('../../lib/db');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);
    const refresh_token = cookies.refreshToken;
    
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
