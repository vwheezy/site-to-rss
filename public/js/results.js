document.addEventListener('DOMContentLoaded', async () => {
    const id = getQueryParameter("id");
    const editUrl = `/feed.html?${new URLSearchParams({ id })}`
    const feedUrl = `/${id}.xml`

    const editUrlElement = document.createElement("a");
    const editUrlText = document.createTextNode(`${window.location.origin}${editUrl}`);
    editUrlElement.appendChild(editUrlText);
    editUrlElement.href = editUrl;

    const feedUrlElement = document.createElement("a");
    const feedUrlText = document.createTextNode(`${window.location.origin}${feedUrl}`);
    feedUrlElement.appendChild(feedUrlText);
    feedUrlElement.href = feedUrl;

    document.getElementById("dynamic-edit-url").appendChild(editUrlElement);
    document.getElementById("dynamic-feed-url").appendChild(feedUrlElement);
});

function getQueryParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}
