import m from 'mithril';
import constants from '../constants';

var bidders = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.placements = m.route.param('placements');
    state.randomized = true;
    state.selected = [];
    state.getParameters = (parameters) => {
      const result = {};
      parameters.forEach((parameter) => result[parameter] = '');
      return result;
    };
  },
  view: (vnode) => {
    const {state} = vnode;
    const buildBidderParameters = () => {
      if (state.selected.length > 0) {
        return m('.selectedPlacements', [
          m('h3', 'Bidder parameters:'),
          state.placements.map((placement) => 
            m('.selectedPlacement',[
              m('.placement', placement.code),
              placement.bids.map((bid) => 
                m('.bidder', [
                  m('.label', bid.bidder),
                  Object.keys(bid.params).map((key) =>
                    m('input', {
                      placeholder: key,
                      value: bid.params[key],
                      onchange: (e) => {
                        bid.params[key] = e.target.value;
                      },
                    })
                  ),
                ])
              ),
            ])
          ),
        ]);
      }
    };

    return  m('.container', [
      m('.info', 'Please select bidders which should be used'),
      m('h3', 'Bidders sequence'),
      m('.tab', [
        m('div',{
          class: state.randomized ? 'active' : null,
          onclick: () => {
            state.randomized = true;
          },
        }, 'Random'),
        m('div',{
          class: !state.randomized ? 'active' : null,
          onclick: () => {
            state.randomized = false;
          },
        }, 'Static'),
      ]),
      m('h3', 'Bidders'),
      m('.bidders', constants.bidders.map((bidder) => 
        m('.bidder', {
          onclick: () => {
            const position = state.selected.indexOf(bidder);
            position > -1 ? state.selected.splice(position, 1) : state.selected.push(bidder);
            if (state.selected.length > 0) {
              state.placements.forEach((placement) =>
                placement['bids'] = state.selected.map((bidder) =>({
                  bidder: bidder.code,
                  params: state.getParameters(bidder.parameters),
                }))
              );
            }
          },
        },[
          m('input', {
            type: 'checkbox',
            checked: state.selected.indexOf(bidder) > -1,
          }),
          m('.label', bidder.name),
        ])
      )),
      buildBidderParameters(),
      m(`.button ${state.selected.length <= 0 ? 'disabled': ''}`, {
        onclick: () => {
          if (state.selected.length > 0) {
            m.route.set('/settings', {
              placements: state.placements,
              randomized: state.randomized,
            });
          }
        },
      }, 'Next'),
    ]);
  },
};

export default bidders;