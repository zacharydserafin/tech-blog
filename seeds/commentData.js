const { Comment } = require('../models');

const commentsData = [
    {
        content:`I can't stand CSS. I'm so glad we have devs like you around!`,
        user_id: 2,
        blog_id: 1,
    },
    {
        content:`I agree. I was hesitant about MVC at first, but I find it really helps me stay organized and efficient.`,
        user_id: 1,
        blog_id: 2,
    },

];

const seedComments = () => Comment.bulkCreate(commentsData);

module.exports = seedComments;