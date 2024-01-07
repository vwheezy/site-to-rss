const express = require('express');
const path = require('path');
const {
    paramFeedIdValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

// TODO: will need to include all .xml files if adding (optional) names to feeds
router.get('/:id.xml',
    paramFeedIdValidationChain(),
    validateInput,
    (req, res) => {
    let id = req.params.id;
    const filePath = path.join(global._base, 'public', 'xml', id + '.xml');
    console.log("filePath ", filePath);

    // FIXME: add error handling here for non-existent files, etc.
    res.download(filePath);
});

module.exports = router;
