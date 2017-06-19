import m from 'mithril';

var prebid = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.granularities = ['low','medium','high','auto','dense','custom'];
    state.config = {
      placements: m.route.param(),
      timeout: 1000,
      granularity: 'medium',
      granularities: [],
      sendAllBids: true,
    };
  },
  view: (vnode) => {
    const {state} = vnode;

    const buildGranularityList = () => {
      return state.config.granularities.map((element, i) =>
        m('.customGranularity', [
          m('input', 
            {
              onchange: (e) => {
                state.config.granularities[i].min = parseFloat(e.target.value);
              },
              name: 'min', 
              type: 'number',
              placeholder: 'Min',
              step: 0.01,
            }),
          m('input', 
            {
              onchange: (e) => {
                state.config.granularities[i].max = parseFloat(e.target.value);
              },
              name: 'max', 
              type: 'number',
              placeholder: 'Max',
              step: 0.01,
            }),
          m('input', 
            {
              onchange: (e) => {
                state.config.granularities[i].increment = parseFloat(e.target.value);
              },
              name: 'increment', 
              type: 'number',
              placeholder: 'Increment',
              step: 0.01,
            }),
          m('.button', {
            onclick: () => {
              state.config.granularities.splice(i, 1);
            },
          },'-'),
        ]));
    };

    const buildCustomGranularities = () => {
      if (state.config.granularity === 'custom') {
        return m('.customGranularities', [
          buildGranularityList(),
          m('.button', {
            onclick: () => {
              state.config.granularities.push({});
            },
          }, '+'),
        ]);
      }
    };

    return  m('.container', [
      m('.info', 'Please update prebid specific configuration.'),
      m('.prebid', [
        m('.block', [
          m('.label', 'Timeout:'),
          m('input', {
            type: 'number',
            value: state.config.timeout,
            onchange: (e) => {
              state.config.timeout = parseInt(e.target.value);
            },
          }),
          m('.label', 'ms'),
        ]),
        m('h3', 'Select bidding mode'),
        m('.biddingMode', [
          m('div',{
            class: state.config.sendAllBids ? 'active' : null,
            onclick: () => {
              state.config.sendAllBids = true;
            },
          }, 'Send All Bids'),
          m('div',{
            class: !state.config.sendAllBids ? 'active' : null,
            onclick: () => {
              state.config.sendAllBids = false;
            },
          }, 'Send Highest Bid'),
        ]),
        m('h3', 'Select granularity'),
        m('.granularities', state.granularities.map((granularity) => 
          m('.granularity', [
            m('input', {
              type: 'radio',
              name: 'granularity',
              value: granularity,
              checked: state.config.granularity === granularity,
              onchange: (e) => {
                state.config.granularities = [];
                state.config.granularity = e.target.value;
              },
            }),
            m('.label', granularity),
          ])
        )),
        buildCustomGranularities(),
      ]),
      m('.button',{
        onclick: () => {
          m.route.set('/output', state.config);
        },
      }, 'Next'),
    ]);
  },
};

export default prebid;