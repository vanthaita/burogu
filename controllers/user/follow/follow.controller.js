const prisma = require('../../../lib/db');

const handleFollow = async (req, res) => {
    const { followerId, followingId, action } = req.body;
    // action {add, remove}

    if (!followerId || !followingId || !action)  {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: followerId,
                followingId: followingId,
            },
        });
        if(action === 'add') {
            if (existingFollow) {
                return res.status(400).json({ message: 'You are already following' });
            }
            const follow = await prisma.follow.create({
                data: {
                    followerId: followerId,
                    followingId: followingId,
                }
            });

            await prisma.user.update({
                where: {
                    id: followingId
                },
                data: {
                    following: {
                        connect: { id: follow.id }
                    }
                }
            })
            
            await prisma.user.update({
                where: {
                    id: followerId
                },
                data: {
                    followers: {
                        connect: { id: follow.id }
                    }
                }
            })
            return res.status(201).json({ message: 'Follow successfully' });
        } else if (action === 'remove') {
            if(!existingFollow) {
                return res.status(400).json({ message: 'You are not following' });
            }
            await prisma.follow.delete({
                where: {
                    id: existingFollow.id
                },
                include: true
            })
            return res.status(201).json({message: "Unfollow successfully "})

        } else {
            return res.status(400).json({ message: 'Error action type' });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { handleFollow };
