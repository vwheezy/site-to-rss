const express = require('express');
const router = express.Router();

const home = require('./Home');
const feedInteraction = require('./FeedInteraction');
const feedXML = require('./FeedXML');
const results = require('./Results');

router.use('/', home);
router.use('/feed.html', feedInteraction);
router.use('/', feedXML);        // FIXME: /:id.xml
router.use('/results.html', results);


module.exports = router;
