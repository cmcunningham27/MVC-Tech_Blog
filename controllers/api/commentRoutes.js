const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//     try {
//         const commentData = await Comment.findOne({
//             where: {
//                 blog_id: req.body.blog_id,
//                 content: req.body.content,
//             }
//         });

//         if (!commentData) {
//             res.status(404).json({ message: 'Comment not found!'});
//         }

//         res.status(200).json(commentData);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });

router.post('/', withAuth, async (req, res) => {
    console.log(req.body);
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
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;