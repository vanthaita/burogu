const prisma = require('../../lib/db');
const handleAddPost = async (req, res) => {
    const { title, content, authorId, category } = req.body;
    console.log(title, content, authorId, category);
    try {
        // const existPost = await prisma.post.findFirst({
        //     where: {
        //         title: title,
        //         authorId: authorId,
        //         content: content
        //     }
        // })

        const newPost = await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: authorId,
                category: category
            }
        })
        // if (existPost) {
        //     return res.status(400).json({ message: 'Post already exists' });
        // }


        return res.status(201).json({ message: 'Post created successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect(); 
    }
};

module.exports = { handleAddPost };
