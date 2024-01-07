const express = require('express');
const createError = require('http-errors');
const Feed = require('../../models/Feed');
const { buildRSS, deleteRSS } = require('../../services/feedProcessing');
const {
    feedDataValidationChain,
    feedIdValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.put('/',
    feedDataValidationChain(),
    feedIdValidationChain(),
    validateInput,
    async (req, res) => {

    let id = req.query.id;
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

    const updatedFeed = await Feed.findByIdAndUpdate(id, options, {
        new: true, runValidators: true,
    });
    if (!updatedFeed)
        throw createError(404, `Could not find feed with id: ${id}`);

    // TODO: Promise.all() on saving feedEntry and buildRSS
    await deleteRSS(updatedFeed._id);
    await buildRSS(updatedFeed);



    res.json(updatedFeed._id);
    }
);


module.exports = router;
