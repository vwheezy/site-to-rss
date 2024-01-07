const express = require('express');
const createError = require('http-errors');
const {
    siteUrlValidationChain,
    validateInput,
} = require('../../middlewares/validationMiddleware');
const { fetchPage } = require('../../services/feedProcessing');

const router = express.Router();

router.get('/',
    siteUrlValidationChain(),
    validateInput,
    async (req, res) => {

    res.json(await fetchPage(req.query['site-url']));
});


module.exports = router;
