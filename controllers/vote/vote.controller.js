const prisma = require('../../lib/db');
const handleVote = async (req, res) => {
    const { voteType, postId, userId } = req.body;
    if (!voteType || !postId || !userId) {
        return res.status(400).json({ message: 'Invalid vote' });
    }
    console.log(voteType)
    try {
        const existingVote = await prisma.vote.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });

        if(voteType === 1) {
            if (existingVote) {
                return res.status(400).json({ message: 'You have already voted' });
            }
            const vote = await prisma.vote.create({
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
                    votes: {
                        connect: {
                            id: vote.id
                        }
                    }
                },
            });
        } else if(voteType === -1) {
            if (!existingVote) {
                return res.status(400).json({ message: 'You have already voted' });
            }
            await prisma.vote.delete({
                where: {
                    id: existingVote.id
                },
                include: true
            })
        } else {
            return res.status(400).json({ message: 'Error vote type' });
        }

        const countVote = await prisma.vote.count({
            where: {
                postId: postId
            }
        });

        return res.status(200).json({ message: 'Vote processed successfully', countVote });

    } catch (err) {
        console.error('Error handling vote:', err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { handleVote };