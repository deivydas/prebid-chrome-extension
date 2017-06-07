/* global chrome, googletag */ 
console.log('gera diena');

let slots = [];
const getSlots = () => {
  if (googletag) slots = googletag.pubads().getSlots();
  console.log(googletag);
};

getSlots();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(slots);
  sendResponse(slots);
});