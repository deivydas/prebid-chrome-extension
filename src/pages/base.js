import m from 'mithril';

var base = {
  view: (vnode) => {
    const {attrs} = vnode;
    return m('.app', [
      m('.menu', [
        m('h2', attrs.title),
      ]),
      m(attrs.container),
    ]);
  },
};

export default base;