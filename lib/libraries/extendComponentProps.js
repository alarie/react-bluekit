'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendComponentProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function extendComponentProps(buildedProps, propsDefinition) {
  var immutableBuildedProps = (0, _immutable.fromJS)(buildedProps);
  var componentProps = {};

  if (propsDefinition.get('children')) componentProps.children = _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: immutableBuildedProps.get('children') || 'DEFAULT CHILDREN' } });

  propsDefinition.map(function (data, prop) {
    var name = data.getIn(['type', 'name']);
    if (name === 'node' || name === 'element') componentProps[prop] = immutableBuildedProps.get(prop) ? _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: immutableBuildedProps.get(prop) } }) : '';
  });

  return immutableBuildedProps.mergeDeep((0, _immutable.fromJS)(componentProps));
}