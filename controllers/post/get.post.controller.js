const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();
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
                votes: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return res.status(201).json({ message: 'Post created successfully' , post});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};

module.exports = { handleGetPost };
