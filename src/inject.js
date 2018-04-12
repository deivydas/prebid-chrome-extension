/* global googletag, pbjs */
var prebidExtensionResult = {
  adUnits: [],
  bids: {},
};

const bidWon = () => {
  var winners = pbjs.getAllWinningBids();
  winners.forEach((winner) => {
    prebidExtensionResult.bids[winner.adUnitCode].forEach((bid) => {
      bid.winner = bid.bidder === winner.bidder && bid.cpm === winner.cpm;
    });
  });
  postMessage(prebidExtensionResult, '*');
};

const auctionEnded = () => {
  var responses = pbjs.getBidResponses();
  Object.keys(responses).forEach((key) => {
    responses[key].bids.forEach((bid) => {
      const bidInfo = {
        bidder: bid.bidder,
        cpm: bid.cpm,
      };
      if (prebidExtensionResult.bids[key]) {
        prebidExtensionResult.bids[key].push(bidInfo);
      } else {
        prebidExtensionResult.bids[key] = [bidInfo];
      }
    });
  });
  postMessage(prebidExtensionResult, '*');
};

const slotLoaded = (event) => {
  if (typeof event.slot != 'undefined') {
    prebidExtensionResult.adUnits.push({
      code: event.slot.getSlotElementId(),
      sizes: event.slot.getSizes().map((size) => ([size.l, size.j])),
    });
  }
  postMessage(prebidExtensionResult, '*');
};

window.pbjs = window.pbjs || {};
pbjs.que = pbjs.que || [];
pbjs.que.push(() => {
  pbjs.onEvent('auctionEnd', auctionEnded);
  pbjs.onEvent('bidWon', bidWon);
});

window.googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(() => {
  googletag.pubads().addEventListener('slotRenderEnded', slotLoaded);
});

postMessage(prebidExtensionResult, '*');