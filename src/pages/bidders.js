import m from 'mithril';
import constants from '../constants';

var bidders = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.placements = m.route.param('placements');
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
      m('.bidders', constants.bidders.map((bidder, index) => 
        m('.bidder', {
          onclick: () => {
            const position = state.selected.indexOf(index);
            position > -1 ? state.selected.splice(position, 1) : state.selected.push(index);
            const selectedBidders = constants.bidders.filter((value, index) => state.selected.indexOf(index) > -1);
            if (selectedBidders.length > 0) {
              state.placements.forEach((placement) =>
                placement['bids'] = selectedBidders.map((bidder) =>({
                  bidder: bidder.code,
                  params: state.getParameters(bidder.parameters),
                }))
              );
            }
          },
        },[
          m('input', {
            type: 'checkbox',
            checked: state.selected.indexOf(index) > -1,
          }),
          m('.label', bidder.name),
        ])
      )),
      buildBidderParameters(),
      m('.button',{
        onclick: () => {
          m.route.set('/prebid', state.placements);
        },
      }, 'Next'),
    ]);
  },
};

export default bidders;