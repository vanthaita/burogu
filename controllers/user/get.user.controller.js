const prisma = require('../../lib/db');
const handleGetUser = async (req, res) => {
    const {userId} = await req.body; 
    console.log(userId);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true, 
                createdAt: true,
                posts: {
                    select: {
                        id: true,
                        author: true,
                        title: true,
                        category: true,
                        votes: true,
                        createdAt: true,
                        comments: true,
                    }, 
                    orderBy : {
                        createdAt: 'desc',
                    }
                },
                comments: true,
                following: true,
                followers: {
                    select: {
                        id: true,
                    }
                },
                votes: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User found successfully', user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};


module.exports = { handleGetUser };