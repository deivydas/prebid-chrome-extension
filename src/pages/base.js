/* global chrome */ 
import m from 'mithril';
// import constants from '../constants';

var base = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.sent = false;

    state.displaySlots = (adUnits) => {
      state.adUnits = adUnits;
      state.sent = true;
      m.redraw();
    };

    state.sendMessage = () => {
      chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, '', state.displaySlots);
      });
    };

  },
  view: (vnode) => {
    const {state} = vnode;
    const build = () => {
      if (!state.sent) {
        state.sendMessage();
        return m('.loading', 'Loading...');
      }

      return state.adUnits 
        ? m('.adunits', state.adUnits.map((adUnit) => 
            (m('.adunit', adUnit.code))
          ))
        : m('.nothing', 'Ad Units not found');
    };

    return m('.app', [       
      m('.container', [
        build(),
        // m('.blocks', constants.bidders.map((bidder) => 
        //   m('.block', {
        //     onclick: () => {
        //       state.sendMessage(bidder.name);
        //     },
        //   },[
        //     m('h2', bidder.name),
        //     m('.text', bidder.name),
        //   ])
        // )),
      ]),
    ]);
  },
};

export default base;