const { User } = require('../models');

const userData = [
    {
        name: 'Wally Peckerwood',
        email: 'wpecker@gmail.com',
        password: '123456',
    },
    {
        name: 'Bill Willard',
        email: 'billiam@gmail.com',
        password: 'abcdefg',
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;