import m from 'mithril';
import base from './pages/base';
import placements from './pages/placements';
import prebid from './pages/prebid';

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
    '/prebid': {
      view: () => {
        return m(base, {
          title: 'Prebid Config',
          container: prebid,
        });
      },
    },
  });
};

document.addEventListener('DOMContentLoaded', routes, false);