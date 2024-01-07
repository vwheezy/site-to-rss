// DESIGN: feed logic script that intercepts requests to the API, reducing server load
const getFeedFields = () => ({
    address: document.getElementById('site-url'),
    pattern: document.getElementById('item-search-pattern'),
    feedTitle: document.getElementById('feed-title'),
    feedLink: document.getElementById('feed-link'),
    feedDescription: document.getElementById('feed-description'),
    itemTitle: document.getElementById('item-title-template'),
    itemLink: document.getElementById('item-link-template'),
    itemContent: document.getElementById('item-content-template')
});

const getFeedOutputs = () => ({
    sourcePreview: document.getElementById('page-source-preview'),
    clippedDataPreview: document.getElementById("clipped-data-preview"),
});

// Step 1
async function loadUrlSource(event) {
    event.preventDefault();

    const { address } = getFeedFields();
    const { sourcePreview } = getFeedOutputs();

    // Create input
    const urlElement = address;
    const params = { [urlElement.name] : `${urlElement.value}` };

    // Scrape inputted website
    const response = await fetch(`/api/scrape-page?${new URLSearchParams(params)}`);
    const scrape = await response.json();

    // Display output of web scrape
    if (response.ok) {
        sourcePreview.textContent = scrape;
        Prism.highlightElement(sourcePreview);
        return scrape;
    }
    else {
        // FIXME: clear results of future steps so not left with mismatching output
        sourcePreview.textContent = "Error in fetch";
        return response;
    }
}

// Step 2
async function parseExtractionRules(event) {
    event.preventDefault();

    const scrapedSource = await loadUrlSource(event);
    const { pattern } = getFeedFields();
    const response = await fetch(`/api/extract-from-pattern`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "source": scrapedSource,
            "pattern": pattern.value,
        }),
    });
    const extractList = await response.json();

    // Display extraction results
    const { clippedDataPreview } = getFeedOutputs();
    if (extractList.length) {
        let displayText = "";

        extractList.forEach(article => {
            displayText += `Item ${article.article}\n`;
            article.extract.forEach(group =>
                displayText += `{%${group.group}} = ${group.content}\n`);
            displayText += `\n`;
        });

        clippedDataPreview.textContent = displayText;
        Prism.highlightElement(clippedDataPreview);
    }
    else {
        // FIXME: clear results of future steps so not left with mismatching output
        clippedDataPreview.textContent = "Search pattern retrieved no results";
    }

    return extractList;
}


/*
// Step 3
function previewFeedContent(event) {
    event.preventDefault();
}
*/
