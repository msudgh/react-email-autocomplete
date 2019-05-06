(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.constants = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var emailServicesDomains = exports.emailServicesDomains = ['yahoo.com', 'hotmail.com', 'gmail.com', 'me.com', 'aol.com', 'mac.com', 'live.com', 'googlemail.com', 'msn.com', 'yahoo.com', 'facebook.com', 'verizon.net', 'outlook.com', 'icloud.com'];

  var protectedKeyCodes = exports.protectedKeyCodes = [9, 17, 18, 35, 36, 37, 38, 39, 40, 45];
});