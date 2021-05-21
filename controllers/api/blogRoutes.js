const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const blogData = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        if(!blogData) {
            res.status(400).json({ message: 'There was a problem with your blog post'})
        }

        res.status(200).json(blogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

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
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;