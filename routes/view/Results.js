const express = require('express');
const path = require('path');
const {
    feedIdValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.get('/',
    feedIdValidationChain(),
    validateInput,
    (req, res) => {
        if(req.query.id)
            res.sendFile(path.join(global._base, 'views', 'results.html'));
});

module.exports = router;
