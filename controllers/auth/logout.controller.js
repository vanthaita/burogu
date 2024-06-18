const prisma = require('../../lib/db');

const handleLogout = async (req, res) => {
    // const cookies = req.cookies;
    // console.log(cookies);
    // if (!cookies?.refreshtoken) return res.sendStatus(401);
    // const token = cookies.refreshtoken;
    
    const { email} = req.body;

    console.log(email);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(403); 
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
        // res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        console.error('Error logging out:', error);
        res.sendStatus(500); 
    }
};

module.exports = { handleLogout };
