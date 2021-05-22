const sequelize = require('../config/connection');

const userData = require('./userData');
const blogData = require('./blogData');
// const commentData = require('./commentData');
const { User, Blog, Comment } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);
    console.log('\n----- USERS SEEDED -----\n');

    await Blog.bulkCreate(blogData);
    console.log('\n----- BLOGS SEEDED -----\n');

    // await Comment.bulkCreate(commentData);
    // console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedDatabase();