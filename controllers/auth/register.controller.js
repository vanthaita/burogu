const bcrypt = require('bcrypt');
const prisma = require('../../lib/db');
const handleRegister = async (req, res) => {
    const { username, email, password } = req.body;
    
    if(typeof email !== 'string') return res.status(404).send('invalid username')

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Invalid' });
    }

    try {
        const duplicate = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (duplicate) {
            return res.status(409).json({ message: 'Username or Email already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword,
                refresh_token: '',
            }
        });
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    } finally {
        await prisma.$disconnect(); 
    }
}

module.exports = { handleRegister };
