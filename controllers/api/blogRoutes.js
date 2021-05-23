const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//creates new blog in database
router.post('/', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(blogData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    console.log('Inside get request', req.params.id);
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [{ model: User, attribute: ['name'] }, { model: Comment, attribute: ['content', 'date'], include: [User] }] 
        });
        console.log('blog data', blogData);
        const blog = blogData.get({ plain: true });
        console.log('blog', blog);
        res.status(200).json(blog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//updates specific blog in database by its id with any changes the user made
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(req.body, {
            where: {
                id: req.params.id
            },
        });

        if (!blogData[0]) {
            res.status(404).json({ message: 'No blog with this id!'});
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//deletes specific blog in database by its id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!blogData) {
            res.status(404).json({ message: 'Could not find the Blog you were looking for!'});
        }

        res.status(200).json(blogData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;