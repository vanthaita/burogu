const prisma = require('../../lib/db');

const handleLogout = async (req, res) => {
    // const cookies = req.cookies;
    // console.log(cookies);
    // if (!cookies?.refreshtoken) return res.sendStatus(401);
    // const token = cookies.refreshtoken;
    
    const { email} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.sendStatus(403); 
        }

        await prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                refresh_token: ' '
            }
        });
        console.log(user);

        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.sendStatus(200);
    } catch (error) {
        console.error('Error logging out:', error);
        res.sendStatus(500); 
    }
};

module.exports = { handleLogout };
