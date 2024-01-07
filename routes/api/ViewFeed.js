const express = require('express');
const createError = require('http-errors');
const Feed = require('../../models/Feed');
const {
    feedIdValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.get('/',
    feedIdValidationChain(),
    validateInput,
    async (req, res) => {

    let id = req.query.id;

    const feed = await Feed.findById(id);
    if (!feed)
        throw createError(404, `Could not find feed with id: ${id}`);

    res.json(feed);
    }
);


module.exports = router;
