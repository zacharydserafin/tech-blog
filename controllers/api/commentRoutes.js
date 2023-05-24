const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:id', withAuth, async (req, res) => {
    try {
      const { content } = req.body;
      const commentData = {
          content: content,
          date_created: new Date(),
          user_id: req.session.user_id,
          blog_id: req.params.id
      }

      const newComment = await Comment.create(commentData);
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      const { content, blog_id } = req.body;
      const id = req.params.id;

      const updatedCommentData = {
          content: content,
          date_created: new Date(),
          user_id: req.session.user_id,
          blog_id: blog_id
      };

      const [affectedRows] = await Comment.update(updatedCommentData, {
          where: {
              id: id,
          }
      });

      if (affectedRows > 0) {
          res.status(200).json({ message: 'Comment updated successfully.' });
      } else {
          res.status(404).json({ message: 'Could not update comment.' }); 
      }
  } catch (err){
      res.status(400).json(err)
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
      const id = req.params.id;

      const affectedRows = await Comment.destroy({
          where: {
              id: id,
          }
      });

      if (affectedRows > 0) {
          res.status(200).json({ message: 'Comment deleted successfully.' });
      } else {
          res.status(404).json({ message: 'Could not delete comment.' }); 
      }
  } catch (err){
      res.status(400).json(err)
  }
});

  module.exports = router;