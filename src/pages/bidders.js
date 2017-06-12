import m from 'mithril';

var bidders = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.config = m.route.param();
  },
  view: (vnode) => {
    const {state} = vnode;
    return  m('.container', [
      m('.info', 'Please find the generated prebid config below.'),
      m('textarea', {
        value: state.template,
      }),
    ]);
  },
};

export default bidders;