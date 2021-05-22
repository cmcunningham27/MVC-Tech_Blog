const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//creates a new comment in database
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        if(!commentData) {
            res.status(400).json({ message: 'There was a problem with your comment'})
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;