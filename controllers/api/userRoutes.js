const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//finds a certain user by name and logs them in if they exist, otherwise notifies them that login failed
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                name: req.body.name
            },
        });

        if(!userData){
            res.status(400).json({ message: 'login failed: username or password incorrect.'});
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({ message: 'login failed: username or password incorrect.'});
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.redirect('/');
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

//creates a new user in database and logs them in
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.redirect('/');
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//logs user out and destroys session
router.post('/logout', withAuth, (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;