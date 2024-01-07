const express = require('express');
const {
    extractValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');
const { extractFromHtml } = require('../../services/feedProcessing');

const router = express.Router();

router.post('/',
    extractValidationChain(),
    validateInput,
    async (req, res) => {

    let { source, pattern } = req.body;
    res.json(await extractFromHtml(source, pattern));
});


module.exports = router;
