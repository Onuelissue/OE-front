const JSUtility = {
  convertPxToVw(value) {
    const viewPortWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vw = 100 * (value / viewPortWidth);
    return `${vw}vw`;
  },

  convertPxToVh(value) {
    const viewPortHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vh = 100 * (value / viewPortHeight);
    return `${vh}vh`;
  }
};
export default JSUtility;