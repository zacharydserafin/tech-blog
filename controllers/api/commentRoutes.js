const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/api/blog/:id', withAuth, async (req, res) => {
    try {
      const { content } = req.body;
      const commentData = {
          content: content,
          user_id: req.session.user_id,
          blog_id: req.params.id
      }

      const newComment = await Comment.create(commentData);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });




  module.exports = router;