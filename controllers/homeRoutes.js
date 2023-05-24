const router = require('express').Router();
const { Comment, User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'date_created'],
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'username']
                        }
                    ]
                },
            ]
        });

        const blog = blogData.get({ plain: true });
        const sessionId = req.session.user_id;
        
        res.render('blog', {
            blog,
            logged_in: req.session.logged_in,
            session_id: sessionId
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog-edit/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);

        const blog = blogData.get({ plain: true });

        res.render('blog-edit', {
            blog,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comment-edit/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);

        const comment = commentData.get({ plain: true });
        const blogId = req.query.blogId;

        res.render('comment-edit', {
            comment,
            blogId,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Blog
                },
                {
                    model: Comment
                }
            ]
        });
        const user = userData.get({ plain: true });
        
        res.render('dashboard', {
            user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }
  
    res.render('login');
});

module.exports = router;