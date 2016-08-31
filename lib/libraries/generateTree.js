'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateTree;

var _parseHighlightedMenu = require('./parseHighlightedMenu');

var _parseHighlightedMenu2 = _interopRequireDefault(_parseHighlightedMenu);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateTree(componentsIndex) {
  return componentsIndex.reduce(function (acc, component, x, y) {
    return acc.setIn((component.get('highlightedMenu') || component.get('menu')).split(/\s/).map(_parseHighlightedMenu2.default), component.get('name'));
  }, new _immutable.Map());
}