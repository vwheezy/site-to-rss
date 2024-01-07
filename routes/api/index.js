const express = require('express');
const router = express.Router();

const createFeed = require('./CreateFeed');
const editFeed = require('./EditFeed');
const deleteFeed = require('./DeleteFeed');
const viewFeed = require('./ViewFeed');

const scrapePage = require('./ScrapePage');
const extractFromPattern = require('./Extract');

const buildFeeds = require('./BuildFeeds');

router.use('/create-feed', createFeed);
router.use('/edit-feed', editFeed);
router.use('/delete-feed', deleteFeed);
router.use('/view-feed', viewFeed);

router.use('/scrape-page', scrapePage);
router.use('/extract-from-pattern', extractFromPattern);

router.use('/build-feeds', buildFeeds);

module.exports = router;
