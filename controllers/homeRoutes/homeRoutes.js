const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll();

        if (!blogData) {
            res.status(404).json({ message: 'There are no blogs' });
        }

        const blogs = Blog.map({ plain: true });

        res.render('homepage', 
            blogs,
            {
                logged_in: req.session.logged_in
            });
    }catch (err) {
        res.status(500).json(err);
    }
});