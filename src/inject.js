/* global googletag, pbjs */
var prebidExtensionResult = {
  adUnits: [],
  bids: {},
};
const prebidExtension = () => {

  if (typeof (googletag) != 'undefined' && typeof googletag.pubads == 'function') {
    var slots = googletag.pubads().getSlots();
    prebidExtensionResult.adUnits = slots.map((slot) => ({
      code: slot.getSlotElementId(),
      sizes: slot.getSizes().map((size) => ([size.l, size.j])),
    }));
  }

  if (typeof (pbjs) != 'undefined') {
    const responses = pbjs.getBidResponses();
    const winners = pbjs.getAllWinningBids();
    Object.keys(responses).forEach((key) => {
      const {bids} = responses[key];
      bids.forEach((bid) => {
        const bidderInfo = {
          bidder: bid.bidder,
          cpm: bid.cpm,
          winner: winners.indexOf(bid) > -1,
        };
        if (prebidExtensionResult.bids[key]) {
          const index = prebidExtensionResult.bids[key].findIndex(bid => bid.bidder === bidderInfo.bidder && bid.cpm === bidderInfo.cpm);
          if (index === -1) {
            prebidExtensionResult.bids[key].push(bidderInfo);
          } else {
            prebidExtensionResult.bids[key][index] = bidderInfo;
          }
        } else {
          prebidExtensionResult.bids[key] = [bidderInfo];
        }
      });
    });
  }
  window.postMessage(prebidExtensionResult, '*');
};

prebidExtension();
window.setInterval(prebidExtension, 1000);