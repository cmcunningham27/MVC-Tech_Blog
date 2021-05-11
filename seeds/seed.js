const sequelize = require('../config/connection');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await userData();
    console.log('\n----- USERS SEEDED -----\n');

    await blogData();
    console.log('\n----- BLOGS SEEDED -----\n');

    await commentData();
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};

seedDatabase();