/* global chrome */ 
import m from 'mithril';
import constants from '../constants';

var base = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.tabId = 'default';

    state.displaySlots = (slots) => {
      console.log(slots);
    };

    state.sendMessage = (message) => {
      chrome.tabs.executeScript(state.tabId, {code: 'const getSlots = () => {  if (googletag) slots = googletag.pubads().getSlots();  console.log(googletag);}; getSlots();'}, function (response) {
        console.log(response);
        // chrome.tabs.executeScript(null, {file: "retrieveValue.js"}, function(ret) {
        //     for (var i = 0; i < ret.length; i++) {
        //         console.log(ret[i]); //prints out each returned element in the array
        //     }
        // });
      });
      console.log(message);
      // chrome.tabs.sendMessage(state.tabId, message);
    };

    state.setCurrentTab = (tabs) => {
      state.tabId = tabs[0].id;
      m.redraw();
    };

    state.getCurrentTab = () => {
      chrome.tabs.query({active: true}, state.setCurrentTab);
    };
  },
  view: (vnode) => {
    const {state} = vnode;
    const build = () => {
      state.getCurrentTab();
    };

    return m('.app', [       
      m('.container', [
        build(),
        m('.blocks', constants.bidders.map((bidder) => 
          m('.block', {
            onclick: () => {
              state.sendMessage(bidder.name);
            },
          },[
            m('h2', bidder.name),
            m('.text', bidder.name),
          ])
        )),
      ]),
    ]);
  },
};

export default base;