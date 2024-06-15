const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    
    if(typeof email !== 'string') return res.status(404).send('invalid username')
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    try {
        const foundUser = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ email: foundUser.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        await prisma.user.update({
            where: { email: email },
            data: { refresh_token: refreshToken }
        });

        return res.json({ accessToken });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};

module.exports = { handleLogin };
