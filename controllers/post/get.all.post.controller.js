const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../../lib/db');

require('dotenv').config();
const handleGetAllPost = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
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
                createdAt: 'desc',
            }
        });
        return res.status(201).json({ message: 'Post created successfully' , posts});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};

module.exports = { handleGetAllPost };
