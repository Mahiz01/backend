const express  = require('express');
const auth = require('../middlewares/auth');
const { addComment, getCommentsBytaskId } = require('../controllers/commentController');

const router= express.Router();

router.post("/add",auth,addComment)
router.get('/get/:id',getCommentsBytaskId)

module.exports= router;