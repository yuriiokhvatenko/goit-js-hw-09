!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var u=r("6JpON"),i={form:document.querySelector("form"),firstDealy:document.querySelector('input[name="delay"]'),delayStep:document.querySelector('input[name="step"]'),amount:document.querySelector('input[name="amount"]'),btn:document.querySelector("button")};i.form.addEventListener("submit",(function(n){var t=function(n){var t,r,a,l;(t=n,r=o,a={position:t,delay:r},l=Math.random()>.3,new Promise((function(e,n){setTimeout((function(){l?e(a):n(a)}),r)}))).then((function(t){t.position;var o=t.delay;e(u).Notify.success("Fulfilled promise ".concat(n," in ").concat(o,"ms"))})).catch((function(t){t.position;var o=t.delay;e(u).Notify.failure("Rejected promise ".concat(n," in ").concat(o,"ms"))})),o+=Number(i.delayStep.value)};n.preventDefault();for(var o=Number(i.firstDealy.value),r=1;r<=i.amount.value;r+=1)t(r)}))}();
//# sourceMappingURL=03-promises.5a271d6e.js.map
