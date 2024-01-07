const express = require('express');
const cron = require('node-cron');
const Feed = require('../../models/Feed');
const { buildRSS, deleteRSS } = require('../../services/feedProcessing.js');


const router = express.Router();

const rebuildAllFeeds = async () => {
    // TODO: make sure rebuild is async
    // TODO: could take a diff on new and old to save IO ops
    const feeds = await Feed.find();
    feeds.forEach(feed => {
        deleteRSS(feed._id);
        buildRSS(feed);
    });

    return feeds.length;
};

cron.schedule('0 * * * *', rebuildAllFeeds);

router.get('/', async (req, res) => {
    const rebuilt = await rebuildAllFeeds();
    res.json(`Rebuilt ${rebuilt} feeds`);
});

module.exports = router;
