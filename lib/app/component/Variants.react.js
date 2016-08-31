'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _AtomPreview = require('../atoms/AtomPreview.react');

var _AtomPreview2 = _interopRequireDefault(_AtomPreview);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _Headings = require('../styles/Headings');

var _Headings2 = _interopRequireDefault(_Headings);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _renderProp = require('../../libraries/renderProp');

var _renderProp2 = _interopRequireDefault(_renderProp);

var _SourceCode = require('./SourceCode.react');

var _SourceCode2 = _interopRequireDefault(_SourceCode);

var _Sources = require('../styles/Sources');

var _Sources2 = _interopRequireDefault(_Sources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Variants = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Variants, _Component);

  function Variants() {
    _classCallCheck(this, Variants);

    return _possibleConstructorReturn(this, (Variants.__proto__ || Object.getPrototypeOf(Variants)).apply(this, arguments));
  }

  _createClass(Variants, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var atom = this.props.atom;

      var propsDefinition = atom.get('propsDefinition');

      return _react2.default.createElement(
        'div',
        null,
        propsDefinition.map(function (value, key) {
          return _this2.renderProp(key, value);
        })
      );
    }
  }, {
    key: 'renderNoVariants',
    value: function renderNoVariants() {
      return _react2.default.createElement(
        'b',
        { style: _Sources2.default.noVariants },
        'There are no possible variants'
      );
    }
  }, {
    key: 'renderProp',
    value: function renderProp(key, definition) {
      if (!definition.get('type')) return null;

      var name = definition.getIn(['type', 'name']);
      var value = definition.getIn(['type', 'value']);
      switch (name) {
        case 'string':
          return this.renderVariants(key, name, ['', 'String ' + key]);
        case 'number':
          return this.renderVariants(key, name, [0, 5, 100, 123.45]);
        case 'bool':
          return this.renderVariants(key, name, [false, true]);
        case 'enum':
          return this.renderEnumVariant(key, name, value);
      }

      return null;
    }
  }, {
    key: 'renderEnumVariant',
    value: function renderEnumVariant(key, name, value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') return this.renderVariants(key, name, value.map(function (text) {
        return text.get('value').replace(/\'/g, '');
      }));
      return null;
    }
  }, {
    key: 'renderVariants',
    value: function renderVariants(key, type, variants) {
      var _this3 = this;

      var headingColor = this.props.headingColor;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: _Sources2.default.panel },
          _react2.default.createElement(
            'h2',
            { id: key + '-variant', style: [_Headings2.default, { color: headingColor }] },
            'Prop variant: ',
            _react2.default.createElement(
              'b',
              null,
              key
            )
          ),
          variants.map(function (variant) {
            return _this3.renderVariant(key, type, variant);
          })
        )
      );
    }
  }, {
    key: 'renderVariant',
    value: function renderVariant(key, type, variant) {
      var _props = this.props;
      var atom = _props.atom;
      var componentProps = _props.componentProps;

      var variantProps = componentProps.set(key, variant);
      var source = '<' + atom.get('componentName') + ' ' + (0, _renderProp2.default)(key, type, variant) + ' />';

      return _react2.default.createElement(
        'div',
        { key: variant, style: _Sources2.default.pre },
        _react2.default.createElement(
          'div',
          { style: _Sources2.default.clear },
          _react2.default.createElement(_AtomPreview2.default, { atom: atom, variantProps: variantProps })
        ),
        _react2.default.createElement(_SourceCode2.default, { atom: atom, customSource: source, name: atom.get('name') + '-' + key + '-' + type + '-' + variant, visible: true }),
        _react2.default.createElement('div', { style: [_Sources2.default.clear, _Sources2.default.clear.after] })
      );
    }
  }]);

  return Variants;
}(_component2.default), _class2.propTypes = {
  atom: _react.PropTypes.object.isRequired,
  componentProps: _react.PropTypes.object.isRequired,
  headingColor: _react.PropTypes.string.isRequired
}, _temp)) || _class;

exports.default = Variants;