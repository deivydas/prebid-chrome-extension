import m from 'mithril';
import base from './pages/base';
import auctions from './pages/auctions';
import placements from './pages/placements';
import bidders from './pages/bidders';
import settings from './pages/settings';
import server from './pages/server';
import output from './pages/output';

require('./app.scss');

const routes = () => {
  m.route(document.body, '/', {
    '/': {
      view: () => {
        return m(base, {
          container: auctions,
          auctionsTabActive: true,
        });
      },
    },
    '/placements': {
      view: () => {
        return m(base, {
          container: placements,
        });
      },
    },
    '/bidders': {
      view: () => {
        return m(base, {
          container: bidders,
        });
      },
    },
    '/settings': {
      view: () => {
        return m(base, {
          container: settings,
        });
      },
    },
    '/server': {
      view: () => {
        return m(base, {
          container: server,
        });
      },
    },
    '/output': {
      view: () => {
        return m(base, {
          container: output,
        });
      },
    },
  });
  // Chrome extension bug fix
  setTimeout(() => {
    document.body.style.display = 'block';
  }, 80);
};

document.addEventListener('DOMContentLoaded', routes, false);