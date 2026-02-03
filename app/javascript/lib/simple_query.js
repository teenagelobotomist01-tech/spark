// Minimal jQuery-like utility (very small subset)
// Usage:
// import $ from "./lib/simple_query"
// $(selector).on('click', handler)
// $(fn) -> DOMContentLoaded
// $(selector).fadeOut(duration)

function $(selector) {
  if (typeof selector === 'function') {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // already ready
      setTimeout(selector, 0);
    } else {
      document.addEventListener('DOMContentLoaded', selector);
    }
    return;
  }

  return new Q(selector);
}

function Q(selector) {
  if (typeof selector === 'string') {
    this.elements = Array.from(document.querySelectorAll(selector));
  } else if (selector instanceof Element) {
    this.elements = [selector];
  } else if (selector instanceof NodeList || Array.isArray(selector)) {
    this.elements = Array.from(selector);
  } else {
    this.elements = [];
  }
}

Q.prototype.on = function(event, selectorOrHandler, handler) {
  // delegated: .on(event, selector, handler)
  if (typeof selectorOrHandler === 'function') {
    const fn = selectorOrHandler;
    this.elements.forEach(el => el.addEventListener(event, fn));
  } else if (typeof selectorOrHandler === 'string' && typeof handler === 'function') {
    const sel = selectorOrHandler;
    this.elements.forEach(root => {
      root.addEventListener(event, function(e) {
        const target = e.target.closest(sel);
        if (target && root.contains(target)) handler.call(target, e);
      });
    });
  }
  return this;
};

Q.prototype.fadeOut = function(duration = 400) {
  this.elements.forEach(el => {
    el.style.transition = `opacity ${duration}ms`;
    el.style.opacity = getComputedStyle(el).opacity || 1;
    requestAnimationFrame(() => {
      el.style.opacity = 0;
      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, duration);
    });
  });
  return this;
};

Q.prototype.hide = function() {
  this.elements.forEach(el => el.style.display = 'none');
  return this;
};

Q.prototype.show = function() {
  this.elements.forEach(el => el.style.display = '');
  return this;
};

export default $;
