const express = require('express');
const path = require('path');
const {
    optionalFeedIdValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

// Get feed creation or feed modification
router.get('/',
    optionalFeedIdValidationChain(),
    validateInput,
    (req, res) => {

        if(req.query.id)
            res.sendFile(path.join(global._base, 'views', 'modifyFeed.html'));
        else
            res.sendFile(path.join(global._base, 'views', 'createFeed.html'));
});

module.exports = router;
