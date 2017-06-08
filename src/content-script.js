/* global chrome */
var script = document.createElement('script');
script.src = chrome.extension.getURL('scripts/inject.js');
script.onload = function () {
  script.remove();
};
(document.head || document.documentElement).appendChild(script);

var slots;
window.addEventListener('message', function (event) {
  if (event.data && event.data.prebid)
    slots = event.data.prebid;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  sendResponse(slots);
});