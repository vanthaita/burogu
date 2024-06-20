
const prisma = require('../../lib/db');

const handleGetAllPost = async (req, res) => {
    const {page, userId} = await req.body;
    console.log(page, userId)
    try {
        let posts;
        if(page === '/trending') {
            posts = await prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    category: true,
                    author: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    comments: {
                        select: {
                            id: true
                        }
                    },
                    votes: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    votes: {
                        _count: 'desc'
                    }
                }
            });
        } else if(page === '/followings') {
            const followings = await prisma.follow.findMany({
                where: {
                    followerId: userId
                },
                select: {
                    followingId: true
                }
            })
            const followingIds = followings.map(follow => follow.followingId);
            posts = await prisma.post.findMany({
                where: {
                    authorId: {
                        in: followingIds
                    }
                },
                select: {
                    id: true,
                    title: true,
                    category: true,
                    author: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    comments: {
                        select: {
                            id: true
                        }
                    },
                    votes: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } else {
            posts = await prisma.post.findMany({
                select: {
                    id: true,
                    title: true,
                    category: true,
                    author: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                    comments: {
                        select: {
                            id: true
                        }
                    },
                    votes: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        return res.status(201).json({ message: 'Post created successfully' , posts});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};

module.exports = { handleGetAllPost };
