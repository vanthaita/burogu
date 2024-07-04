const prisma = require('../../lib/db');

const handleGetPost = async (req, res) => {
    const {postId} = await req.body;
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: {
                id: true,
                title: true,
                category: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                comments: {
                    select: {
                        id: true,
                        content: true,
                        author: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                        createdAt: true,
                        updatedAt: true,
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                bookmarks: {
                    select: {
                        userId: true
                    }
                },
                votes: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return res.status(200).json({ message: 'Get post successfully' , post});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};

module.exports = { handleGetPost };
