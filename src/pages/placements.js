/* global chrome */ 
import m from 'mithril';

var placements = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.selected = [];

    state.displayPlacements = (placements) => {
      state.placements = placements;
      m.redraw();
    };

    state.sendMessage = () => {
      chrome.tabs.query({active: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, 'placements', state.displayPlacements);
      });
    };

  },
  view: (vnode) => {
    const {state} = vnode;
    const build = () => {
      state.sendMessage();
      if (!state.placements) {
        return m('.loading', 'Loading...');
      }

      return state.placements.length > 0 
        ? m('.placements', [
          state.placements.map((placement, index) => 
            m('.placement', {
              onclick: () => {
                const position = state.selected.indexOf(index);
                position > -1 ? state.selected.splice(position, 1) : state.selected.push(index);
              },
            },[
              m('input', {
                type: 'checkbox',
                checked: state.selected.indexOf(index) > -1,
              }),
              m('.label', placement.code),
            ])
          ),
          m(`.button ${state.selected.length <= 0 ? 'disabled': ''}`, {
            onclick: () => {
              if (state.selected.length > 0) {
                m.route.set('/bidders', {
                  placements: state.placements.filter((value, index) => state.selected.indexOf(index) > -1),
                });
              }
            },
          }, 'Next'),
        ])
        : m('.nothing', 'Placements not found on active website.');
    };

    return  m('.container', [
      m('.info', 'Please selected placements for which prebid config should be created.'),
      build(),
    ]);
  },
};

export default placements;