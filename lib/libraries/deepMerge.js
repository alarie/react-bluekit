'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = deepMerge;
function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isObject(arg) {
  return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object';
}

/**
 * Deep merge objects.
 */
function deepMerge() {
  var _arguments = arguments;

  var target = _extends({}, arguments[0]);

  Object.keys(arguments).forEach(function (index) {
    if (index === 0) {
      return;
    }

    var obj = _arguments[index];

    for (var key in obj) {
      if (!hasOwn(obj, key)) {
        continue;
      }

      var val = obj[key];

      if (val instanceof Array) {
        target[key] = val;
      } else if (isObject(val) && isObject(target[key])) {
        target[key] = deepMerge(target[key], val);
      } else {
        target[key] = val;
      }
    }
  });

  return target;
}