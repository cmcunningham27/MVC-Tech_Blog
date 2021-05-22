const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User, attributes: ['name']}, { model: Comment, include: [User] }]
        });

        if (!blogData) {
            res.status(404).json({ message: 'There are no blogs' });
        }

        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{ model: Blog, attributes: ['id','title', 'contents', 'date' ]}]
        });

        if(!userData) {
            res.status(404).json({ message: 'User not found!'})
        }

        const users = userData.get({ plain: true });

        res.render('dashboard', {
            users,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blog/:id', withAuth, async (req, res) => {
    try {

        const blogData = await Blog.findByPk(req.params.id, {
            include: [{ model: User, attribute: ['name']}, { model: Comment, include: [User] }]
        });

        if (!blogData) {
            res.status(400).json({ message: 'Blog not found!'});
        }

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;