document.addEventListener('DOMContentLoaded', async () => {
    try {
        const id = getQueryParameter('id');
        const response = await fetch(`/api/view-feed?${new URLSearchParams({id})}`);
        const data = await response.json();
        if (response.ok)
            updateDynamicContent(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

function getQueryParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}

function updateDynamicContent(data) {
    const { address, pattern, feedTitle, feedLink,
            feedDescription, itemTitle, itemLink, itemContent } = getFeedFields();
    address.value = `${data.address}`;
    pattern.value = `${data.pattern}`;
    feedTitle.value = `${data.feedTitle}`;
    feedLink.value = `${data.feedLink}`;
    feedDescription.value = `${data.feedDescription}`;
    itemTitle.value = `${data.itemTitle}`;
    itemLink.value = `${data.itemLink}`;
    itemContent.value = `${data.itemContent}`;

    // FIXME: can't automatically load these because regex is too slow
    // loadUrlSource();
    // parseExtractionRules();
}

async function modifyFeedContent(event) {
    event.preventDefault();
    const { address, pattern, feedTitle, feedLink,
            feedDescription, itemTitle, itemLink, itemContent } = getFeedFields();

    const reqId = getQueryParameter('id');
    const response = await fetch(`/api/edit-feed?${new URLSearchParams({id: reqId})}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            address: address.value, pattern: pattern.value,
            feedTitle: feedTitle.value, feedLink: feedLink.value,
            feedDescription: feedDescription.value, itemTitle: itemTitle.value,
            itemLink: itemLink.value, itemContent: itemContent.value
        }),       // FIXME: should probably do some validation
    });
    const id = await response.json();

    if (response.ok) {
        console.log(`Feed ${id} updated`);
        window.location.replace(`/results.html?${new URLSearchParams({id})}`);
    }
    else {
    }
}

async function deleteFeedContent(event) {
    event.preventDefault();
    const id = getQueryParameter('id');
    const response = await fetch(`/api/delete-feed?${new URLSearchParams({id})}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        console.log(`Feed ${id} deleted`);
        window.location.replace(`/`);
    }

}

