import m from 'mithril';
import highlight from 'highlight.js';

var output = {
  oninit: (vnode) => {
    const {state} = vnode;
    state.config = m.route.param();

    state.buildPlacements = () => {
      return `[${state.config.placements.map((placement) => `{
    code: '${placement.code}',
    sizes: [${placement.sizes.map((size) =>`\n      [${size.map((dim) => parseInt(dim))}]`)}
    ],
    bids: [${placement.bids.map((bid) => `{
        bidder: '${bid.bidder}',
        params: {${Object.keys(bid.params).map((key) => `\n            ${key}: '${bid.params[key]}'`)}
        }
    }`)}]
}`)}]`;
    };

    state.buildCustomGranularity = () => {
      return state.config.granularity === 'custom' ? `\nvar customGranularity = {
    buckets: [${state.config.granularities.map((granularity) => `{
        max: ${granularity.max},
        min: ${granularity.min},
        increment: ${granularity.increment}
    }`)}]
};` : '';
    };

    state.buildS2S = () => {
      return  state.config.isS2SConfigRequired ? `\n        s2sConfig: {
            accountId: ${state.config.s2sConfig.accountId},
            enabled: ${state.config.s2sConfig.enabled},
            bidders: [${state.config.s2sConfig.bidders.map((bidder) =>`\n               '${bidder}'`)}
            ],
            timeout: ${state.config.s2sConfig.timeout},
            adapter: '${state.config.s2sConfig.adapter}',
            endpoint: '${state.config.s2sConfig.endpoint}',
            syncEndpoint: '${state.config.s2sConfig.syncEndpoint}',
        }`:'';
    };

    state.template = `<!-- Make sure this is inserted before your GPT tag -->
<script type="text/javascript"${state.config.async ? ' async' : ''} src="${state.config.libraryUrl}"></script>
<script> 
var adUnits = ${state.buildPlacements()};

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];${state.buildCustomGranularity()}

</script>
<script>
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function() {
    googletag.pubads().disableInitialLoad();
});

pbjs.que.push(function() {
    pbjs.setConfig({
        bidderSequence: '${state.config.sequence}',
        enableSendAllBids: ${state.config.sendAllBids},
        priceGranularity: ${state.config.granularity !== 'custom' ? `'${state.config.granularity}'` :'customGranularity'},${state.buildS2S()}
    });
    pbjs.addAdUnits(adUnits);
    pbjs.requestBids({
        timeout: ${state.config.timeout},
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