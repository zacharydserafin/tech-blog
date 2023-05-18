const { Blog } = require('../models');

const blogData = [
    {
        title: 'I love CSS!',
        content: 'While many have difficulties working with Cascading Style Sheets, I find CSS to be incredibly flexible and full of opportunity, so long as the developer is creative enough.',
        user_id: 1,
    },
    {
        title: 'MVC is Key',
        content: 'The separation of concerns paradigm is incredibly important for an aspiring web developer to understand and follow. Keeping code concise and separated enables your code to be more readable, modular, and easier to maintain.',
        user_id: 2,
    }
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;