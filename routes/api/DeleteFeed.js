const express = require('express');
const createError = require('http-errors');
const Feed = require('../../models/Feed');
const { deleteRSS } = require('../../services/feedProcessing');
const {
    feedIdValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.delete('/',
    feedIdValidationChain(),
    validateInput,
    async (req, res) => {

    let id = req.query.id;

    const deletedFeed = await Feed.findByIdAndDelete(id);
    if (!deletedFeed)
        throw createError(404, `Could not delete feed with id: ${id}`);
    // TODO: Promise.all() on deleting feed and xml

    await deleteRSS(deletedFeed._id);

    res.json(deletedFeed._id);
    }
);


module.exports = router;
