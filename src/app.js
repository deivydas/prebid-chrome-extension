import m from 'mithril';
import base from './pages/base';
import placements from './pages/placements';

require('./styles/main.scss');

const routes = () => {
  m.route.prefix('#');
  m.route(document.body, '/', {
    '/': {
      view: () => {
        return m(base, {
          title: 'Placements',
          container: placements,
        });
      },
    },
  });
};

document.addEventListener('DOMContentLoaded', routes, false);