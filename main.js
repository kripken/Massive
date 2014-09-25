(function () {

document.querySelector('.logo').addEventListener('click', function (e) {
  e.preventDefault();
  replaceHash();
});

// Open external links in a new tab.
Array.prototype.slice.call(
  document.querySelectorAll('[href^="//"], [href*="://"]')
).forEach(function (link) {
  link.setAttribute('target', '_blank');
});

// Set `data` attribute for the current section so we can use as a CSS selector.
window.addEventListener('hashchange', updateHash);

function updateHash() {
  document.body.dataset.hash = window.location.hash;
}

function replaceHash(newHash) {
  window.history.replaceState(null, null,
    window.location.pathname + (newHash || ''));
  updateHash();
}

updateHash();

var sectionsEls = Array.prototype.slice.call(document.querySelectorAll('section, footer'));
sections = sectionsEls.map(function (el) {
  return {
    top: el.offsetTop,
    id: el.id
  };
});

function closest() {
  var section;
  var top = window.scrollY;
  var i = sections.length;
  while (i--) {
    section = sections[i];
    if (top >= section.top - 1) {
      return section;
    }
  }
}

window.addEventListener('scroll', debounce(function () {
  var h = closest();
  var newHash = h ? ('#' + h.id) : '';

  // Update the querystring in the address bar.
  if (window.location.hash !== newHash) {
    replaceHash(newHash);
  }
}, 20));

// debounce and throttle inspired from Underscore.js'.
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
function debounce(func, wait) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    function later() {
      timeout = null;
      func.apply(context, args);
    }
    var callNow = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

function throttle(func, wait) {
  if (!isFunction(func)) {
    throw new TypeError;
  }
  return debounce(func, wait);
}

})();
