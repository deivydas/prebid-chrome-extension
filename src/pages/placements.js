/* global chrome */ 
import m from 'mithril';

var base = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.sent = false;

    state.displayPlacements = (placements) => {
      state.placements = placements;
      state.sent = true;
      m.redraw();
    };

    state.sendMessage = () => {
      chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, '', state.displayPlacements);
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

      return state.placements 
        ? m('.placements', [
          state.placements.map((placement) => 
            m('.placement', [
              m('input', {
                type: 'checkbox',
              }),
              m('.label', placement.code),
            ])
          ),
          m('.button', 'Next'),
        ])
        : m('.nothing', 'Placements not found on active website.');
    };

    return  m('.container', [
      m('.info', 'Please selected placements for which prebid config should be created.'),
      build(),
    ]);
  },
};

export default base;