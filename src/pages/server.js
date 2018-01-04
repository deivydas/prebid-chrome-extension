
import m from 'mithril';
import constants from '../constants';

var server = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.selected = [];
    state.config = m.route.param();
    state.config.s2sConfig = {
      accountId: '',
      enabled: true,
      bidders: [],
      timeout: 1000,
      adapter: 'prebidServer',
      endpoint: constants.server2ServerEndPoint,
      syncEndpoint: constants.server2ServerSyncEndPoint,
    };
  },
  view: (vnode) => {
    const {state} = vnode;
    return m('.container', [
      m('.info', 'Please update prebid server to server settings.'),
      m('.settings', [
        m('.block margin', [
          m('.label length', 'Timeout:'),
          m('input', {
            class: 'right',
            type: 'number',
            value: state.config.s2sConfig.timeout,
            onchange: (e) => {
              state.config.s2sConfig.timeout = parseInt(e.target.value);
            },
          }),
          m('.label calc', 'ms'),
        ]),
        m('.block margin', [
          m('.label length', 'AccountId:'),
          m('input', {
            class: 'long left',
            value: state.config.s2sConfig.accountId,
            onchange: (e) => {
              state.config.s2sConfig.accountId = e.target.value;
            },
          }),
        ]),
        m('.block margin', [
          m('.label length', 'Endpoint:'),
          m('input', {
            class: 'long left',
            value: state.config.s2sConfig.endpoint,
            onchange: (e) => {
              state.config.s2sConfig.endpoint = e.target.value;
            },
          }),
        ]),
        m('.block margin', [
          m('.label length', 'SyncEndpoint:'),
          m('input', {
            class: 'long left',
            value: state.config.s2sConfig.syncEndpoint,
            onchange: (e) => {
              state.config.s2sConfig.syncEndpoint = e.target.value;
            },
          }),
        ]),
        m('h3', 'Enable server to server'),
        m('.tab', [
          m('div',{
            class: state.config.s2sConfig.enabled ? 'active' : null,
            onclick: () => {
              state.config.s2sConfig.enabled = true;
            },
          }, 'Enabled'),
          m('div',{
            class: !state.config.s2sConfig.enabled ? 'active' : null,
            onclick: () => {
              state.config.s2sConfig.enabled = false;
            },
          }, 'Disabled'),
        ]),
        m('h3', 'Bidders'),
        m('.bidders', constants.server2ServerBidders.map((bidder) => 
          m('.bidder', {
            onclick: () => {
              const position = state.config.s2sConfig.bidders.indexOf(bidder.code);
              position > -1 ? state.config.s2sConfig.bidders.splice(position, 1) : state.config.s2sConfig.bidders.push(bidder.code);
            },
          },[
            m('input', {
              type: 'checkbox',
              checked: state.config.s2sConfig.bidders.indexOf(bidder.code) > -1,
            }),
            m('.label', bidder.name),
          ])
        )),
      ]),
      m(`.button ${state.config.s2sConfig.accountId === '' || state.config.s2sConfig.bidders.length <= 0 ? 'disabled': ''}`,{
        onclick: () => {
          m.route.set('/output', state.config);
        },
      }, 'Next'),
    ]);
  },
};

export default server;