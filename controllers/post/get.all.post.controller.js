const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
                createdAt: true,
                updatedAt: true,
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
