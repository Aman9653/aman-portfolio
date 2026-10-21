// jest-dom adds custom matchers for asserting on DOM nodes:
// https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

/**
 * jsdom implements neither of these, and both are used throughout the site
 * (theme detection, reduced-motion checks, scroll reveals). Stub them so
 * components render in tests the same way they do in a browser.
 */

if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

if (!window.IntersectionObserver) {
  class IntersectionObserverStub {
    constructor(callback) {
      this.callback = callback;
    }

    observe() {}

    unobserve() {}

    disconnect() {}

    takeRecords() {
      return [];
    }
  }

  window.IntersectionObserver = IntersectionObserverStub;
  global.IntersectionObserver = IntersectionObserverStub;
}

if (!window.ResizeObserver) {
  class ResizeObserverStub {
    observe() {}

    unobserve() {}

    disconnect() {}
  }

  window.ResizeObserver = ResizeObserverStub;
  global.ResizeObserver = ResizeObserverStub;
}

window.scrollTo = jest.fn();
