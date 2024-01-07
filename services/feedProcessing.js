const createError = require('http-errors');
const path = require('path');
const fs = require('fs').promises;
const { Feed: RSS } = require('feed');

const fetchPage = async (url) => {
    // Fetch the URL, change status code if URL not found
    let response;
    try {
        response = await fetch(new URL(url));
    }
    catch (err) {
        throw createError(404, "Site not found");
    }
    const scrapeText = await response.text();
    return scrapeText;
};

const extractFromHtml = async (htmlSource, searchPattern) => {
    htmlSource = htmlSource.replace(/\n/g, '');

    // convert searchPattern into regex
    const regexPattern = searchPattern
        .replace(/\{\*\}/g, '(?:.*?)')    // Replace "{*}" with non-capturing group for any character
        .replace(/\{\%\}/g, '(.*?)');     // Replace "{%}" with capturing group for any character
    let re = new RegExp(regexPattern, 'gm');

    // FIXME: this is SUPER slow
    let match;
    let retVals = [];
    let article = 1;
    while ((match = re.exec(htmlSource)) !== null) {
        if (match.length === 1)
            continue;
        let articleObj = {article: article, extract: []};
        for (let i = 1; i < match.length; i++) {
            articleObj.extract.push({group: i, content: match[i]});
        }

        retVals.push(articleObj);
        article++;
    }

    // return [ {article: X, extract: [{group: Y, content: Z}, ...]}, ... ]
    return retVals;
};

const buildRSS = async (feed) => {
    const html = await fetchPage(feed.address);
    const extract = await extractFromHtml(html, feed.pattern);

    const rss = new RSS({
        title: feed.feedTitle,
        link: feed.feedLink,
        description: feed.feedDescription
    });

    // FIXME: SUPER SUPER SUPER hacky
    const replaceTemplateStrings = (inputString, values) => {
        // Regular expression to match substrings like "{%x}"
        const regex = /\{\%(\d+)\}/g;

        // Replace each occurrence of the matched substring with the corresponding value
        const replacedString = inputString.replace(regex, (match, group) => {
            const index = parseInt(group, 10);
            return values[index] || match; // Assuming values are 1-indexed in the array
        });

        return replacedString;
    }
    const buildContentList = (extractList) => {
        let contentList = [];
        for (const group of extractList) {
            contentList[group.group] = group.content; // make array 1-indexed
        }
        return contentList;
    }

    // TODO: set max limit of how many items added to feed
    for (const article of extract) {
        const contentList = buildContentList(article.extract);
        rss.addItem({
            title: replaceTemplateStrings(feed.itemTitle, contentList),
            link: replaceTemplateStrings(feed.itemLink, contentList),
            content: replaceTemplateStrings(feed.itemContent, contentList),
        });
    }

    // Write RSS to file
    await fs.writeFile(path.join(global._base, "public", "xml", feed._id + ".xml"),
                       rss.rss2());
};

const deleteRSS = async (id) => {
    const filePath = path.join(global._base, "public", "xml", id + ".xml");
    await fs.unlink(filePath);
};

module.exports = {
    fetchPage,
    extractFromHtml,
    buildRSS,
    deleteRSS,
};
