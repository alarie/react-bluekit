'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizePath;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizePath(str) {
  var separator = arguments.length <= 1 || arguments[1] === undefined ? _path2.default.sep : arguments[1];

  if (separator === '\\') {
    str = str.replace(/\\/g, '/');
  }
  return str;
}