
var token = document.getElementsByTagName("pre")[0].innerHTML.trim();

if (token) {

    chrome.runtime.sendMessage({authToken: token});
}