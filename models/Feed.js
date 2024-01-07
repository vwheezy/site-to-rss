const mongoose = require('mongoose'),
    { alphanumeric } = require('nanoid-dictionary'),
    { customAlphabet } = require('nanoid'),
    { FEED_NAME_LENGTH } = require('../resources/constants');
    nanoid = customAlphabet(alphanumeric, FEED_NAME_LENGTH);

let requestSchema = new mongoose.Schema({
    _id: {type: String, default: () => nanoid()},
    address: {type: String, required: true},
    pattern: {type: String, required: true},
    feedTitle: {type: String, required: true},
    feedLink: {type: String, required: false, default: ''},
    feedDescription: {type: String, required: false, default: ''},
    itemTitle: {type: String, required: true},
    itemLink: {type: String, required: true},
    itemContent: {type: String, required: true}
}, {collection: "feeds"});

let Feed = mongoose.model('Feed', requestSchema);

module.exports = Feed;
