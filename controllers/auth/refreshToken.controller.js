const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.Refresh_token) return res.sendStatus(401);
    const refreshToken = cookies.Refresh_token;
    
    // const authHeader = req.headers['authorization'] || req.headers['Authorization']
    // const refreshToken = authHeader && authHeader.split(' ')[1]
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, data) => {
            if (err) return res.sendStatus(403); 

            const foundUser = await prisma.user.findUnique({
                where: { email: data.email }
            });

            if (!foundUser) {
                return res.status(403).json({ message: 'Invalid email or password' });
            }

            const accessToken = jwt.sign({ email: foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

            return res.json({ accessToken });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};

module.exports = {handleRefreshToken};
