export const getScreenInfo = () => {
  const returnObj = {};
  // returnObj.url = window.location.href;
  // returnObj.innerHeight = window.innerHeight;
  // returnObj.innerWidth = window.innerWidth;
  // const _location = {};
  // const _navigator = {};
  const _screen = {};
  // try {
  //   for (const i in window.navigator) {
  //     if (!(typeof window.navigator[i] === "function")) {
  //       _navigator[i] = window.navigator[i];
  //     }
  //   }
  // } catch (ignored) { }
  // try {
  //   for (const i in window.location) {
  //     if (!(typeof window.location[i] === "function")) {
  //       _location[i] = window.location[i];
  //     }
  //   }
  // } catch (ignored) { }
  try {
    for (const i in window.screen) {
      if (!(typeof window.screen[i] === "function")) {
        _screen[i] = window.screen[i];
      }
    }
  } catch (ignored) { }
  // returnObj.userAgent = window.navigator.userAgent;
  // returnObj.navigator = _navigator;
  // returnObj.location = _location;
  returnObj.screen = _screen;
  return returnObj;
};
