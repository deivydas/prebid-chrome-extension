/* global chrome */ 
import m from 'mithril';

var auctions = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.displayBids = (bids) => {
      state.bids = bids;
      m.redraw();
    };
    
    state.sendMessage = () => {
      chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'auctions', state.displayBids);
      });
    };
  },
  view: (vnode) => {
    const {state} = vnode;
    const build = () => {
      state.sendMessage();
      if (!state.bids) {
        return m('.loading', 'Loading...');
      }

      const bids = Object.keys(state.bids);
      return bids.length > 0 ? bids.map((key) =>
        m('.auction',[
          m('.placement', key),
          m('.auctionBidders', state.bids[key].map((bidder) => 
            m('.bidder', [
              m(`.label ${bidder.winner ? 'winner' : bidder.cpm <= 0 ? 'nobid': ''}`, bidder.bidder),
              m(`.label ${bidder.winner ? 'winner' : bidder.cpm <= 0 ? 'nobid': ''}`, bidder.cpm > 0 ? bidder.cpm.toFixed(2) : 'No bid'),
            ])
          )),
        ])) :  m('.nothing', 'Prebid is not implemented on this page');
    };
    
    return  m('.container', [
      m('.info', 'Here is the result of the auction that just ran'),
      build(),
    ]);
  },
};

export default auctions;