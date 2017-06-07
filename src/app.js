import m from 'mithril';
import base from './pages/base';

require('./app.scss');

const routes = () => {
  m.route.prefix('#');
  m.route(document.body, '/', {
    '/': {
      view: () => {
        return m(base);
      },
    },
  });
};

document.addEventListener('DOMContentLoaded', routes, false);