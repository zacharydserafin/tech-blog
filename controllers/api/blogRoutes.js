const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        const blogData = {
            title: title,
            content: content,
            date_created: new Date(),
            user_id: req.session.user_id
        };

        const blog = await Blog.create(blogData);

        res.status(200).json({ blog });
    } catch (err){
        res.status(400).json(err)
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id;

        const updatedBlogData = {
            title: title,
            content: content,
            date_created: new Date(),
            user_id: req.session.user_id
        };

        const [affectedRows] = await Blog.update(updatedBlogData, {
            where: {
                id: id,
                user_id: req.session.user_id
            }
        });

        if (affectedRows > 0) {
            res.status(200).json({ message: 'Blog post updated successfully.' });
        } else {
            res.status(404).json({ message: 'Could not update blog post.' }); 
        }
    } catch (err){
        res.status(400).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const id = req.params.id;

        const affectedRows = await Blog.destroy({
            where: {
                id: id,
                user_id: req.session.user_id
            }
        });

        if (affectedRows > 0) {
            res.status(200).json({ message: 'Blog post deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Could not delete blog post.' }); 
        }
    } catch (err){
        res.status(400).json(err)
    }
});

module.exports = router;