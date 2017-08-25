/* global googletag, pbjs */
const prebidExtension = () => {
  var result = {
    adUnits: [],
    bids: {},
  };

  if (typeof (googletag) != 'undefined' && typeof googletag.pubads == 'function') {
    var slots = googletag.pubads().getSlots();
    result.adUnits = slots.map((slot) => ({
      code: slot.getSlotElementId(),
      sizes: slot.getSizes().map((size) => ([size.l, size.j])),
    }));
  }

  if (typeof (pbjs) != 'undefined') {
    pbjs._bidsReceived.forEach((bid) => {
      if (result.bids[bid.adUnitCode]) {
        result.bids[bid.adUnitCode].push({
          bidder: bid.bidder,
          cpm: bid.cpm,
          winner: pbjs._winningBids.indexOf(bid) > -1,
        });
      } else {
        result.bids[bid.adUnitCode] = [{
          bidder: bid.bidder,
          cpm: bid.cpm,
          winner: pbjs._winningBids.indexOf(bid) > -1,
        }];
      }
    });
  }

  window.postMessage(result, '*');
};

prebidExtension();
window.setInterval(prebidExtension, 1000);