var menu = document.getElementById("menu");
var menuItems = document.getElementById("items");

var isActive = false;
menu.addEventListener("click", () => {
    menuItems.classList.toggle("active");
});

function shorthLink(link) {
    if (link.length <= 0) {
        document.getElementById('addLinkMsg').style.display = 'block';
        return false;
    }
    var ajax_url = "https://api.shrtco.de/v2/shorten?url=" + link;
    var getUrl = async function () {
        let url_shorted = await (await fetch(ajax_url).catch(function (err) {
            console.warn(err);
            return new Response(JSON.stringify({
                code: 400,
                message: 'An error has been ocurred'
            }))
        })).json();
        if (url_shorted.code && url_shorted.code === 400) return;

        var short_link = url_shorted['result']['short_link'];
        var parent_div = document.getElementById('listedLinks')
        var div = document.createElement('div');
        div.innerHTML = '' + link + '  ' + short_link + '<a class="shortedLink" onclick="copyLink(this,&apos;' + short_link + '&apos;)">Copy</a>';
        parent_div.parentNode.insertBefore(div, parent_div);
    }
    getUrl();
}

function copyLink(element, link) {
    var myTemporaryInputElement = document.createElement("input");
    myTemporaryInputElement.type = "text";
    myTemporaryInputElement.value = link;
    document.body.appendChild(myTemporaryInputElement);
    myTemporaryInputElement.select();
    document.execCommand("Copy");
    document.body.removeChild(myTemporaryInputElement);
    element.innerHTML = 'Copied!';
    setTimeout(function () { element.innerHTML = 'Copy'; }, 3000);
}