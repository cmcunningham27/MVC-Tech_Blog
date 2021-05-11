const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_name',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Blog,
    Comment
}