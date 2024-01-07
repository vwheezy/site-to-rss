const { validationResult, body, query, param } = require('express-validator');
const createError = require('http-errors');
const { FEED_NAME_LENGTH } = require('../resources/constants');

const validateItemProperty = (value, { req }) => {
    // validate item property contains template pattern i.e. "{%x}" where x is int > 0
    const re = /\{\%(\d+)\}/g;
    const matches = [...value.matchAll(re)];
    if (!matches.length)
        throw createError(400, "Item property must contain template string");

    // validate item property template pattern is a valid number
    const pattern = req.body.pattern;
    const numberOfTemplatePlaceholders = (pattern.match(/\{\%\}/g) || []).length;
    for (const match of matches) {
        const capturedNumber = parseInt(match[1], 10);

        if (isNaN(capturedNumber) || capturedNumber <= 0 || capturedNumber > numberOfTemplatePlaceholders) {
            throw createError(
                400,
                `The template number ${capturedNumber} is not within valid range of ${numberOfTemplatePlaceholders}`
            );
        }
    }

    return true;
};

// TODO: extract 'pattern' out to be used
const feedDataValidationChain = () => [
    body('address').trim().notEmpty().isURL().withMessage('address is a URL'),
    body('pattern').trim().notEmpty().isString().withMessage('pattern'),
    body('feedTitle').trim().notEmpty().isString().withMessage('feedTitle'),
    body('feedLink').trim().isURL().withMessage('feedLink').optional({ values : 'falsy' }),
    body('feedDescription').trim().isString().withMessage('feedDescription').optional(),
    body('itemTitle').trim().notEmpty().isString().custom(validateItemProperty).withMessage('itemTitle'),
    body('itemLink').trim().notEmpty().isString().custom(validateItemProperty).withMessage('itemLink'),
    body('itemContent').trim().notEmpty().isString().custom(validateItemProperty).withMessage('itemContent'),
];

const extractValidationChain = () => [
    body('source').trim().notEmpty().isString(),
    body('pattern').trim().notEmpty().isString(),
];

// TODO: generalize feedId chains
const feedIdValidationChain = () => [
    query('id').isAlphanumeric().withMessage("isAlphanumeric")
    .isLength({min: FEED_NAME_LENGTH, max: FEED_NAME_LENGTH}).withMessage("Wrong length")
    .notEmpty().withMessage('id is required'),
];

const optionalFeedIdValidationChain = () => [
    query('id').isAlphanumeric().withMessage("isAlphanumeric")
    .isLength({min: FEED_NAME_LENGTH, max: FEED_NAME_LENGTH}).withMessage("Wrong length")
    .optional(),
];

const paramFeedIdValidationChain = () => [
    param('id').isAlphanumeric().withMessage("isAlphanumeric")
    .isLength({min: FEED_NAME_LENGTH, max: FEED_NAME_LENGTH}).withMessage("Wrong length")
    .notEmpty().withMessage('id is required'),
];

const siteUrlValidationChain = () => [
    // TODO: how to encode url?
    query('site-url').trim().notEmpty().isURL().withMessage('Bad request on scrape-page'),
];

const validateInput = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        console.error(validationErrors.array())
        const validationErrorMsg = validationErrors.array()
            .map(error => error.msg).join(', ');
        return next(createError(400, validationErrorMsg));
    }
    next();
};

module.exports = {
    feedDataValidationChain,
    extractValidationChain,
    feedIdValidationChain,
    optionalFeedIdValidationChain,
    paramFeedIdValidationChain,
    siteUrlValidationChain,
    validateInput,
};
