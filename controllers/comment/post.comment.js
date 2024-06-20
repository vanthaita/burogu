const prisma = require('../../lib/db')

const handlePostComment = async (req, res) => {
    const { authorId, postId, content } = req.body;

    if (!authorId || !postId || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const existPost = await prisma.post.findUnique({
            where: {
                id: postId,
            },
        });

        if (!existPost) {
            return res.status(400).json({ message: 'Post does not exist' });
        }

        const newComment = await prisma.comment.create({
            data: {
                authorId: authorId,
                postId: postId,
                content: content,
            },
            select: {
                id: true,
                authorId: true,
                postId: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                author: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            }
        });
        await prisma.user.update({
            where: {
                id: authorId,
            },
            data: {
                comments: {
                    connect: { id: newComment.id },
                },
            },
        })
        await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                comments: {
                    connect: { id: newComment.id },
                },
            },
        });
        return res.status(201).json({ message: 'Comment created successfully', comment: newComment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { handlePostComment };
