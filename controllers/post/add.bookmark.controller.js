const prisma = require('../../lib/db');

const handleBookmark = async (req, res) => {
    const { action, postId, userId } = req.body;
    if (!action || !postId || !userId) {
        return res.status(400).json({ message: 'Invalid' });
    }
    try {
        const existingBookmark = await prisma.bookmark.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });
        
        if(action === 'add') {
            if (existingBookmark) {
                return res.status(400).json({ message: 'You have already bookmarked this post' });
            }
            const bookmark = await prisma.bookmark.create({
                data: {
                    postId: postId,
                    userId: userId,
                }
            });
    
            await prisma.post.update({
                where: {
                    id: postId,
                },
                data: {
                    bookmarks: {
                        connect: {
                            id: bookmark.id
                        }
                    }
                },
            });
        } else if(action === 'remove') {
            if (!existingBookmark) {
                return res.status(400).json({ message: 'You have not bookmarked this post' });
            }
            await prisma.bookmark.delete({
                where: {
                    id: existingBookmark.id
                }
            });
        } else {
            return res.status(400).json({ message: 'Error bookmark type' });
        }

    
        return res.status(200).json({ message: 'Bookmark processed successfully' });

    } catch (err) {
        console.error('Error handling bookmark:', err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { handleBookmark };
