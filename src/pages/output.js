import m from 'mithril';
import highlight from 'highlight.js';

var output = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.config = m.route.param();
    state.template = `<!-- Make sure this is inserted before your GPT tag -->
<script type="text/javascript" src="//acdn.adnxs.com/prebid/not-for-prod/prebid.js"></script>
<script> 
var adUnits = ${JSON.stringify(state.config.placements, null, 4)};

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];
${state.config.sendAllBids ? 'pbjs.enableSendAllBids();': ''}
${state.config.granularity === 'custom' ? `var customGranularity = {
    "buckets" : ${JSON.stringify(state.config.granularities, null, 4)}
};` : ''}
pbjs.setPriceGranularity(${state.config.granularity !== 'custom' ? `'${state.config.granularity}'` :'customGranularity'});

</script>
<script>
var PREBID_TIMEOUT = ${state.config.timeout};
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function() {
    googletag.pubads().disableInitialLoad();
});

pbjs.que.push(function() {
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
        bidsBackHandler: sendAdserverRequest
    });
});

function sendAdserverRequest() {
    if (pbjs.adserverRequestSent) return;
    pbjs.adserverRequestSent = true;
    googletag.cmd.push(function() {
        pbjs.que.push(function() {
            pbjs.setTargetingForGPTAsync();
            googletag.pubads().refresh();
        });
    });
}

setTimeout(function() {
    sendAdserverRequest();
}, PREBID_TIMEOUT);

</script>
<!-- Make sure this is inserted before your GPT tag -->`;
  },
  view: (vnode) => {
    const {state} = vnode;
    return  m('.container', [
      m('.info', 'Please find the generated prebid config below.'),
      m('pre', [
        m('code', m.trust(highlight.highlight('html',state.template).value)),
      ]),
    ]);
  },
};

export default output;