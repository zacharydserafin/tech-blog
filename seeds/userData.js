const { User } = require('../models');

const userData = [
    {
        username: 'Wally Peckerwood',
        password: '123456',
    },
    {
        username: 'Bill Willard',
        password: 'abcdefg',
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;