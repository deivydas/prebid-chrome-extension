import m from 'mithril';
import constants from '../constants';

var settings = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.granularities = constants.granularities;
    state.config = {
      placements: m.route.param('placements'),
      timeout: 2000,
      granularity: 'medium',
      granularities: [],
      sendAllBids: true,
      libraryUrl: constants.libraryUrl,
      async: true,
      sequence: m.route.param('sequence'),
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
      m('.info', 'Please update prebid settings.'),
      m('.settings', [
        m('h3', 'Timeout'),
        m('.block', [
          m('input', {
            class: 'right',
            type: 'number',
            value: state.config.timeout,
            onchange: (e) => {
              state.config.timeout = parseInt(e.target.value);
            },
          }),
          m('.label', 'ms'),
        ]),
        m('h3', 'Library'),
        m('.tab', [
          m('div',{
            class: state.config.async ? 'active' : null,
            onclick: () => {
              state.config.async = true;
            },
          }, 'Async'),
          m('div',{
            class: !state.config.async ? 'active' : null,
            onclick: () => {
              state.config.async = false;
            },
          }, 'Sync'),
        ]),
        m('.block margin', [
          m('.label', 'URL:'),
          m('input', {
            class: 'long left',
            value: state.config.libraryUrl,
            onchange: (e) => {
              state.config.libraryUrl = e.target.value;
            },
          }),
        ]),
        m('h3', 'Select bidding mode'),
        m('.tab', [
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

export default settings;