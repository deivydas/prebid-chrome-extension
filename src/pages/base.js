import m from 'mithril';

var base = {
  view: (vnode) => {
    const {attrs} = vnode;
    return m('.app', [
      m('.menu', [
        m('.tab white', [
          m('div',{
            class: attrs.auctionsTabActive ? 'active' : null,
            onclick: () => {
              m.route.set('/');
            },
          }, 'Prebid auctions'),
          m('div',{
            class: !attrs.auctionsTabActive ? 'active' : null,
            onclick: () => {
              m.route.set('/placements');
            },
          }, 'Create prebid config'),
        ]),
      ]),
      m(attrs.container),
    ]);
  },
};

export default base;