/* global googletag */
window.onload = () => {
  if (typeof (googletag) != 'undefined') {
    var slots = googletag.pubads().getSlots();
    var adunits = slots.map((slot) => ({
      code: slot.getSlotElementId(),
      sizes: slot.getSizes().map((size) => ([size.l, size.j])),
    }));

    window.postMessage({
      prebid: adunits,
    },'*');
  } else {
    window.postMessage({
      prebid: [],
    },'*');
  }
};