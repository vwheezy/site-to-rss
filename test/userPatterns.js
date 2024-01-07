const userPatterns = [
    {
        'url': 'https://betterdev.link',
        'pattern': '<div{*}class="issue-link">{*}href="{%}" target="_blank">{%}</a>{*}<p><p>{%}</p>'
    },
    {
        'url': '',
        'pattern': '<td class=searchresultsjoblink>{*}title="{%}"{*}href="{%}"{*}<td class=searchresultstopofjobdesc>{%}</td>'
    },
    {
        'url': 'https://plurrrr.com',
        'pattern': '<article><h2{*}href={*}>{%}</a>{*}<blockquote>{%}</blockquote>{*}Source: <a href="{%}"{*}</article>'
    },
];

module.exports = userPatterns;
