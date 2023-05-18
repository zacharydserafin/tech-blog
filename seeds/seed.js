const seedComments = require('./commentData');
const seedBlogs = require('./blogData');
const seedUsers = require('./userData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Database Synced!');
  
  await seedUsers();
  console.log('Users Seeded!');

  await seedBlogs();
  console.log('Blogs Seeded!');
  
  await seedComments();
  console.log('Comments Seeded!');

  process.exit(0);
};

seedAll();