const Sequelize = require('sequelize');
require('dotenv').config();

//sequelize connection with dotenv private information, MySQL database, and which port to use 
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);

module.exports = sequelize;