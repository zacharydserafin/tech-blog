const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/dashboard', withAuth, async (req, res) => {
    try {
        const { title, content } = req.body;

        const blogData = {
            title: title,
            content: content,
            user_id: req.session.user_id
        };

        const blog = await Blog.create(blogData);

        res.status(200).json({ blog });
    } catch (err){
        res.status(400).json(err)
    }
});

module.exports = router;