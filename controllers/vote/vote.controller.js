const prisma = require('../../lib/db');

const handleVote = async (req, res) => {
    const { voteType, postId, userId } = req.body;
    console.log(voteType, postId, userId);
    if (!voteType || !postId || !userId || (voteType !== 1 && voteType !== -1)) {
        return res.status(400).json({ message: 'Invalid vote' });
    }

    try {
        const vote = voteType === 1 ? true : false;
        const existingVote = await prisma.vote.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });

        if (existingVote) {
            if (existingVote.isUpvote !== vote) {
                await prisma.vote.update({
                    where: {
                        id: existingVote.id
                    },
                    data: {
                        isUpvote: vote
                    }
                });
            } else {
                return res.status(400).json({ message: 'You have already voted this way' });
            }
        } else {
            await prisma.vote.create({
                data: {
                    postId: postId,
                    userId: userId,
                    isUpvote: vote
                }
            });
        }
        const [countUpvotes, countDownvotes] = await prisma.$transaction([
            prisma.vote.count({
                where: {
                    postId: postId,
                    isUpvote: true
                }
            }),
            prisma.vote.count({
                where: {
                    postId: postId,
                    isUpvote: false
                }
            })
        ]);

        // const netVotes = countUpvotes - countDownvotes;
        console.log(netVotes, countUpvotes, countDownvotes);
        return res.status(200).json({ message: 'Vote processed successfully', countUpvotes });

    } catch (err) {
        console.error('Error handling vote:', err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { handleVote };
