const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: Blog, attributes: ['title', 'contents', 'date']}]
        });

        if (!userData) {
            res.status(404).json({ message: 'There are no blogs' });
        }
        console.log(req.session.logged_in);
        const user = userData.map((user) => user.get({ plain: true }));
        res.render('homepage', {
            user,
            logged_in: req.session.logged_in
        });
    }catch (err) {
        console.log(err);
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