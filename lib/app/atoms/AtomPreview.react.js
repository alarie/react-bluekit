'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2;

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _extendComponentProps = require('../../libraries/extendComponentProps');

var _extendComponentProps2 = _interopRequireDefault(_extendComponentProps);

var _filterFunctionProps = require('../../libraries/filterFunctionProps');

var _filterFunctionProps2 = _interopRequireDefault(_filterFunctionProps);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _resolveComponent = require('../../libraries/resolveComponent');

var _resolveComponent2 = _interopRequireDefault(_resolveComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtomPreview = (0, _radium2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(AtomPreview, _Component);

  function AtomPreview() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AtomPreview);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AtomPreview.__proto__ || Object.getPrototypeOf(AtomPreview)).call.apply(_ref, [this].concat(args))), _this), _this.mounted = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AtomPreview, [{
    key: 'atomProps',
    value: function atomProps() {
      var _props = this.props;
      var atom = _props.atom;
      var disableFunctionProps = _props.disableFunctionProps;
      var variantProps = _props.variantProps;

      var simpleProps = atom.get('simpleProps').toJS();
      var filteredProps = disableFunctionProps ? (0, _filterFunctionProps2.default)(simpleProps) : simpleProps;
      var customProps = variantProps ? variantProps : {};

      return (0, _extendComponentProps2.default)(filteredProps, atom.get('propsDefinition')).mergeDeep((0, _extendComponentProps2.default)(customProps, atom.get('propsDefinition')));
    }
  }, {
    key: 'render',
    value: function render() {
      var atom = this.props.atom;


      if (!atom) return null;

      var ExampleComponent = (0, _resolveComponent2.default)(atom.get('component'));

      return _react2.default.createElement(
        'div',
        { style: styles },
        _react2.default.createElement(ExampleComponent, this.atomProps().toJS())
      );
    }
  }]);

  return AtomPreview;
}(_component2.default), _class2.propTypes = {
  atom: _react.PropTypes.object,
  disableFunctionProps: _react.PropTypes.bool,
  variantProps: _react.PropTypes.object
}, _temp2)) || _class;

exports.default = AtomPreview;
;

var styles = {
  position: 'relative',
  minHeight: '35px',
  minWidth: '50px'
};