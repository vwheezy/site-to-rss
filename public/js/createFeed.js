async function submitFeedContent(event) {
    event.preventDefault();
    const { address, pattern, feedTitle, feedLink,
            feedDescription, itemTitle, itemLink, itemContent } = getFeedFields();

    const response = await fetch(`/api/create-feed`, {
        method: "POST",
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
        window.location.replace(`/results.html?${new URLSearchParams({id})}`);
    }
    else {
    }
}
