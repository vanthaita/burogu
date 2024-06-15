const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleGetUser = async (req, res) => {
    const userId = req.params.id; 
    console.log(userId);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                posts: true,
                comments: true,
                following: true,
                followers: true,
                votes: true,
            },
        });


        if (user) {
            const { password, ...userWithoutPassword } = user;
            res.status(200).json(userWithoutPassword);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};


module.exports = { handleGetUser };