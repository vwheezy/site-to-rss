const express = require('express');
const createError = require('http-errors');
const Feed = require('../../models/Feed');
const { buildRSS } = require('../../services/feedProcessing');
const {
    feedDataValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.post('/',
    feedDataValidationChain(),
    validateInput,
    async (req, res) => {

    let { address, pattern, feedTitle, feedLink,
          feedDescription, itemTitle, itemLink, itemContent } = req.body;

    let options = {
        address,
        pattern,
        feedTitle,
        feedLink,
        feedDescription,
        itemTitle,
        itemLink,
        itemContent,
    };

    let feedEntry = new Feed(options);

    // TODO: find possible conflicting _id first
    const newEntry = await feedEntry.save();
    // TODO: Promise.all() on saving feedEntry and buildRSS
    await buildRSS(newEntry);


    if (!newEntry) throw createError(500, "Failed saving to database");

    res.json(newEntry._id);
    }
);


module.exports = router;
