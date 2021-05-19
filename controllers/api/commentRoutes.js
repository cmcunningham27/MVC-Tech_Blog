const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        
        if(!commentData) {
            res.status(400).json({ message: 'there was a problem with your comment'})
        }

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});