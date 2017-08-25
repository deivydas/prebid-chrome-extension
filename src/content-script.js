/* global chrome */
var script = document.createElement('script');
script.src = chrome.extension.getURL('scripts/inject.js');
script.onload = function () {
  script.remove();
};
(document.head || document.documentElement).appendChild(script);

var slots;
var auctions;
window.addEventListener('message', function (event) {
  if (event.data) {
    if (event.data.adUnits) {
      slots = event.data.adUnits;
    }
    if (event.data.bids) {
      auctions = event.data.bids;
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === 'placements')
    sendResponse(slots);
  if (message === 'auctions')
    sendResponse(auctions);
});