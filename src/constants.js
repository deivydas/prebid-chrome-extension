const constants = {
  granularities: ['low','medium','high','auto','dense','custom'],
  libraryUrl: '//acdn.adnxs.com/prebid/not-for-prod/prebid.js',
  bidders: [{
    'name': '152Media',
    'code': 'oftmedia',
    'parameters': ['placementId'],
  }, {
    'name': 'Aardvark',
    'code': 'aardvark',
    'parameters': ['ai', 'sc'],
  }, {
    'name': 'Adblade',
    'code': 'adblade',
    'parameters': ['partnerId'],
  }, {
    'name': 'AdBund',
    'code': 'adbund',
    'parameters': ['sid', 'bidfloor'],
  }, {
    'name': 'AdButler',
    'code': 'adbutler',
    'parameters': ['accountID', 'zoneID'],
  }, {
    'name': 'Adform',
    'code': 'adform',
    'parameters': ['mid'],
  }, {
    'name': 'AdKernel',
    'code': 'adkernel',
    'parameters': ['host', 'zoneId'],
  }, {
    'name': 'AdMedia',
    'code': 'admedia',
    'parameters': ['aid'],
  }, {
    'name': 'AdMixer',
    'code': 'admixer',
    'parameters': ['zone'],
  }, {
    'name': 'AdSupply',
    'code': 'adsupply',
    'parameters': ['clientId', 'siteId', 'zoneId', 'endpointUrl'],
  }, {
    'name': 'adxcg',
    'code': 'adxcg',
    'parameters': ['adzoneid'],
  }, {
    'name': 'Adyoulike',
    'code': 'adyoulike',
    'parameters': ['placement'],
  }, {
    'name': 'AerServ',
    'code': 'aerserv',
    'parameters': ['plc'],
  }, {
    'name': 'AOL',
    'code': 'aol',
    'parameters': ['placement', 'network'],
  }, {
    'name': 'AppNexus AST',
    'code': 'appnexusAst',
    'parameters': ['placementId'],
  }, {
    'name': 'AppNexus',
    'code': 'appnexus',
    'parameters': ['placementId'],
  }, {
    'name': 'Atomx',
    'code': 'atomx',
    'parameters': ['id'],
  }, {
    'name': 'Audience Network',
    'code': 'audienceNetwork',
    'parameters': ['placementId'],
  }, {
    'name': 'Beachfront',
    'code': 'beachfront',
    'parameters': ['appId -', 'bidfloor'],
  }, {
    'name': 'Bidfluence',
    'code': 'bidfluence',
    'parameters': ['adunitId', 'pubId'],
  }, {
    'name': 'bRealTime',
    'code': 'brealtime',
    'parameters': ['placementId'],
  }, {
    'name': 'Brightcom',
    'code': 'brightcom',
    'parameters': ['tagId'],
  }, {
    'name': 'C1X',
    'code': 'c1x',
    'parameters': ['siteId'],
  }, {
    'name': 'Carambola',
    'code': 'carambola',
    'parameters': ['pid', 'did', 'wid'],
  }, {
    'name': 'Conversant',
    'code': 'conversant',
    'parameters': ['site_id'],
  }, {
    'name': 'Cox',
    'code': 'cox',
    'parameters': ['size', 'id', 'siteId'],
  }, {
    'name': 'Criteo',
    'code': 'criteo',
    'parameters': ['zoneId'],
  }, {
    'name': 'Defy Media',
    'code': 'defymedia',
    'parameters': ['placementId'],
  }, {
    'name': 'DistrictM',
    'code': 'districtm',
    'parameters': ['placementId'],
  }, {
    'name': 'DistrictmDMX',
    'code': 'districtmDMX',
    'parameters': ['id'],
  }, {
    'name': 'E-Planning',
    'code': 'eplanning',
    'parameters': ['ci'],
  }, {
    'name': 'AdBund',
    'code': 'essens',
    'parameters': ['placementID'],
  }, {
    'name': 'Feature Forward',
    'code': 'featureforward',
    'parameters': ['placementId'],
  }, {
    'name': 'Fidelity',
    'code': 'fidelity',
    'parameters': ['zoneid'],
  }, {
    'name': 'GetIntent',
    'code': 'getintent',
    'parameters': ['pid'],
  }, {
    'name': 'Gourmet Ads',
    'code': 'gourmetads',
    'parameters': ['placementId'],
  }, {
    'name': 'GumGum',
    'code': 'gumgum',
    'parameters': ['inScreen', 'inSlot'],
  }, {
    'name': 'Head Bidding',
    'code': 'headbidding',
    'parameters': ['zoneId', 'host'],
  }, {
    'name': 'HIRO Media',
    'code': 'hiromedia',
    'parameters': ['accountId'],
  }, {
    'name': 'Huddled Masses',
    'code': 'huddledmasses',
    'parameters': ['placement_id'],
  }, {
    'name': 'imonomy',
    'code': 'imonomy',
    'parameters': ['publisher_id'],
  }, {
    'name': 'Index Exchange (Casale)',
    'code': 'indexExchange',
    'parameters': ['id', 'siteID'],
  }, {
    'name': 'Inneractive',
    'code': 'inneractive',
    'parameters': ['appId', 'adSpotType'],
  }, {
    'name': 'Innity',
    'code': 'innity',
    'parameters': ['pub', 'zone'],
  }, {
    'name': 'J Carter Marketing',
    'code': 'jcm',
    'parameters': ['id', 'siteID'],
  }, {
    'name': 'Justpremium',
    'code': 'justpremium',
    'parameters': ['zone'],
  }, {
    'name': 'Kargo',
    'code': 'kargo',
    'parameters': ['placementId'],
  }, {
    'name': 'Komoona',
    'code': 'komoona',
    'parameters': ['hbid', 'placementId'],
  }, {
    'name': 'Lifestreet',
    'code': 'lifestreet',
    'parameters': ['jstag_url', 'slot', 'adkey', 'ad_size'],
  }, {
    'name': 'Mantis',
    'code': 'mantis',
    'parameters': ['property'],
  }, {
    'name': 'Marsmedia',
    'code': 'marsmedia',
    'parameters': ['publisherID'],
  }, {
    'name': 'Matomy',
    'code': 'matomy',
    'parameters': ['placementId'],
  }, {
    'name': 'Meme Global',
    'code': 'memeglobal',
    'parameters': ['tagid'],
  }, {
    'name': 'MobFox',
    'code': 'mobfox',
    'parameters': ['s'],
  }, {
    'name': 'NginAd',
    'code': 'nginad',
    'parameters': ['pzoneid', 'nginadDomain'],
  }, {
    'name': 'ONE by AOL Display',
    'code': 'onedisplay',
    'parameters': ['placement', 'network'],
  }, {
    'name': 'ONE by AOL Mobile',
    'code': 'onemobile',
    'parameters': ['dcn', 'pos'],
  }, {
    'name': 'OpenX',
    'code': 'openx',
    'parameters': ['unit', 'delDomain'],
  }, {
    'name': 'Page Science',
    'code': 'pagescience',
    'parameters': ['placementId'],
  }, {
    'name': 'Piximedia',
    'code': 'piximedia',
    'parameters': ['siteId', 'placementId'],
  }, {
    'name': 'Platform.io',
    'code': 'platformio',
    'parameters': ['pubId', 'siteId'],
  }, {
    'name': 'Pollux Network',
    'code': 'pollux',
    'parameters': ['zone'],
  }, {
    'name': 'Pubgears',
    'code': 'pubgears',
    'parameters': ['publisherName', 'pubZone'],
  }, {
    'name': 'Pubmatic',
    'code': 'pubmatic',
    'parameters': ['publisherId', 'adSlot'],
  }, {
    'name': 'PulsePoint',
    'code': 'pulsepoint',
    'parameters': ['cf', 'cp', 'ct'],
  }, {
    'name': 'Quantcast',
    'code': 'quantcast',
    'parameters': ['publisherId'],
  }, {
    'name': 'RhythmOne',
    'code': 'rhythmone',
    'parameters': ['placementId'],
  }, {
    'name': 'Roxot',
    'code': 'roxot',
    'parameters': ['publisherId'],
  }, {
    'name': 'Rubicon Project',
    'code': 'rubicon',
    'parameters': ['accountId', 'siteId', 'zoneId'],
  }, {
    'name': 'Sekindo',
    'code': 'sekindoUM',
    'parameters': ['spaceId'],
  }, {
    'name': 'Sharethrough',
    'code': 'sharethrough',
    'parameters': ['pkey'],
  }, {
    'name': 'Smart AdServer',
    'code': 'smartadserver',
    'parameters': ['domain', 'siteId', 'pageId', 'formatId'],
  }, {
    'name': 'SmartyAds',
    'code': 'smartyads',
    'parameters': ['banner_id'],
  }, {
    'name': 'StickyAdsTV',
    'code': 'stickyadstv',
    'parameters': ['zoneId'],
  }, {
    'name': 'Sonobi',
    'code': 'sonobi',
    'parameters': ['ad_unit', 'placement_id'],
  }, {
    'name': 'Sovrn',
    'code': 'sovrn',
    'parameters': ['tagid'],
  }, {
    'name': 'SpotX',
    'code': 'spotx',
    'parameters': ['channel_id', 'video_slot', 'slot'],
  }, {
    'name': 'SpringServe',
    'code': 'springserve',
    'parameters': ['impId', 'supplyPartnerId'],
  }, {
    'name': 'TapSense',
    'code': 'tapsense',
    'parameters': ['ad_unit_id', 'user'],
  }, {
    'name': 'ThoughtLeadr',
    'code': 'thoughtleadr',
    'parameters': ['placementId'],
  }, {
    'name': 'Trion Interactive',
    'code': 'trion',
    'parameters': ['pubId', 'sectionId'],
  }, {
    'name': 'TripleLift',
    'code': 'triplelift',
    'parameters': ['inventoryCode'],
  }, {
    'name': 'Twenga',
    'code': 'twenga',
    'parameters': ['placementId'],
  }, {
    'name': 'ucfunnel',
    'code': 'ucfunnel',
    'parameters': ['adid', 'width', 'height'],
  }, {
    'name': 'Underdog Media',
    'code': 'underdogmedia',
    'parameters': ['siteId'],
  }, {
    'name': 'Unruly',
    'code': 'unruly',
    'parameters': ['siteId', 'targetingUUID'],
  }, {
    'name': 'Vertamedia',
    'code': 'vertamedia',
    'parameters': ['aid', 'placementId'],
  }, {
    'name': 'Vertoz',
    'code': 'vertoz',
    'parameters': ['placementId'],
  }, {
    'name': 'WideOrbit',
    'code': 'wideorbit',
    'parameters': ['pbId', 'pId'],
  }, {
    'name': 'Widespace',
    'code': 'widespace',
    'parameters': ['sid', 'cur'],
  }, {
    'name': 'Xaxis',
    'code': 'xhb',
    'parameters': ['placementId'],
  }, {
    'name': 'Yieldbot',
    'code': 'yieldbot',
    'parameters': ['psn', 'slot'],
  }],
};

export default constants;