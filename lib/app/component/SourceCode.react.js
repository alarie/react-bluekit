'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _AceEditor = require('../atoms/AceEditor.react');

var _AceEditor2 = _interopRequireDefault(_AceEditor);

var _component = require('react-pure-render/component');

var _component2 = _interopRequireDefault(_component);

var _CopyCode = require('../atoms/CopyCode.react');

var _CopyCode2 = _interopRequireDefault(_CopyCode);

var _Font = require('../styles/Font');

var _Font2 = _interopRequireDefault(_Font);

var _Icon = require('../atoms/Icon.react');

var _Icon2 = _interopRequireDefault(_Icon);

var _MediaQueries = require('../styles/MediaQueries');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _renderProp = require('../../libraries/renderProp');

var _renderProp2 = _interopRequireDefault(_renderProp);

var _Spaces = require('../styles/Spaces');

var _Spaces2 = _interopRequireDefault(_Spaces);

var _Colors = require('../styles/Colors');

var colors = _interopRequireWildcard(_Colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SourceCode = (0, _radium2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(SourceCode, _Component);

  function SourceCode() {
    _classCallCheck(this, SourceCode);

    return _possibleConstructorReturn(this, (SourceCode.__proto__ || Object.getPrototypeOf(SourceCode)).apply(this, arguments));
  }

  _createClass(SourceCode, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var atom = _props.atom;
      var customSource = _props.customSource;
      var componentProps = _props.componentProps;
      var showToggle = _props.showToggle;

      var componentName = atom.get('componentName');
      var file = atom.get('file');
      var source = customSource || (componentProps.get('children') ? 'import ' + componentName + ' from \'' + file + '\' \n\n<' + componentName + ' \n' + this.renderInlineProps(false) + '\n>\n  ' + componentProps.get('children') + '\n</' + componentName + '>' : 'import ' + componentName + ' from \'' + file + '\' \n\n<' + componentName + ' \n' + this.renderInlineProps() + '\n/>');

      return _react2.default.createElement(
        'div',
        { style: [styles.copyWrapper, showToggle && styles.copyWrapper.toggle] },
        this.renderToggle(),
        _react2.default.createElement(_CopyCode2.default, { inheritedStyles: showToggle && styles.copy, source: source }),
        this.renderSource(source)
      );
    }
  }, {
    key: 'renderToggle',
    value: function renderToggle() {
      var showToggle = this.props.showToggle;
      var _context = this.context;
      var toggleSourceCode = _context.toggleSourceCode;
      var showSourceCode = _context.showSourceCode;


      if (!showToggle) return null;

      return _react2.default.createElement(
        'div',
        {
          onClick: toggleSourceCode.bind(this),
          style: styles.sourceHeader
        },
        _react2.default.createElement(_Icon2.default, { color: colors.BLUE, kind: 'code', size: 28, wrapperStyle: styles.icon.code }),
        showSourceCode ? 'Hide ' : 'Show ',
        'source code',
        _react2.default.createElement(_Icon2.default, {
          color: colors.BLUE,
          kind: 'arrow',
          size: 10,
          wrapperStyle: [styles.icon.arrow, showSourceCode && styles.sourceHeader.visible.arrow]
        })
      );
    }
  }, {
    key: 'renderSource',
    value: function renderSource(source) {
      var _props2 = this.props;
      var name = _props2.name;
      var showToggle = _props2.showToggle;
      var showSourceCode = this.context.showSourceCode;


      if (!showSourceCode && showToggle) return null;

      return _react2.default.createElement(
        'div',
        { style: [styles.sourceWrapper, !showToggle && styles.sourceWrapper.withoutToggle] },
        _react2.default.createElement(
          'div',
          { style: styles.pre },
          _react2.default.createElement(_AceEditor2.default, {
            editorProps: { $blockScrolling: true },
            fontSize: 11,
            highlightActiveLine: false,
            maxLines: ('' + source).split(/\n/).length,
            mode: 'jsx',
            name: name,
            readOnly: true,
            setOptions: {
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false
            },
            showGutter: false,
            showPrintMargin: false,
            theme: 'chrome',
            value: source,
            width: '100%'
          })
        )
      );
    }
  }, {
    key: 'renderInlineProps',
    value: function renderInlineProps() {
      var renderChildren = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
      var atom = this.props.atom;

      var propsDefinition = atom.get('propsDefinition').toJS();
      var componentProps = this.props.componentProps;


      return Object.keys(propsDefinition).filter(function (key) {
        return renderChildren || key !== 'children';
      }).filter(function (key) {
        return propsDefinition[key].type;
      }).filter(function (key) {
        return typeof componentProps.get(key) !== 'undefined';
      }).map(function (key) {
        return '  ' + (0, _renderProp2.default)(key, propsDefinition[key].type.name, componentProps.get(key));
      }).join('\n');
    }
  }]);

  return SourceCode;
}(_component2.default), _class2.propTypes = {
  atom: _react.PropTypes.object.isRequired,
  componentProps: _react.PropTypes.object,
  customSource: _react.PropTypes.string,
  name: _react.PropTypes.object.isRequired,
  showToggle: _react.PropTypes.bool
}, _class2.contextTypes = {
  showSourceCode: _react.PropTypes.bool,
  toggleSourceCode: _react.PropTypes.func
}, _temp)) || _class;

exports.default = SourceCode;


var styles = {
  copy: {
    backgroundColor: 'transparent',
    top: '2px'
  },

  icon: {
    code: {
      position: 'absolute',
      left: '15px',
      top: '10px'
    },
    arrow: {
      position: 'absolute',
      right: '61px',
      top: '15px'
    }
  },

  sourceHeader: _extends({}, _Font2.default, {
    border: '1px solid ' + colors.GRAY_DARKER,
    backgroundColor: colors.GRAY,
    fontSize: '15px',
    padding: _Spaces2.default.smaller + ' ' + _Spaces2.default.smaller + ' ' + _Spaces2.default.smaller + ' 55px',
    position: 'relative',
    marginTop: '30px',
    zIndex: 1,
    ':hover': {
      cursor: 'pointer'
    },
    visible: {
      arrow: {
        transform: 'rotate(180deg)'
      }
    }
  }),

  copyWrapper: {
    position: 'relative',
    toggle: _defineProperty({
      marginBottom: '50px'
    }, _MediaQueries.mediaQueries.breakpointTablet, {
      marginBottom: '15px'
    })
  },

  pre: {
    margin: 0,
    padding: 0,
    width: '100%',
    display: 'table',
    tableLayout: 'fixed'
  },

  sourceWrapper: {
    backgroundColor: 'white',
    position: 'relative',
    padding: '15px',
    borderWidth: '0 1px 1px 1px',
    borderColor: colors.GRAY_DARKER,
    borderStyle: 'solid',
    margin: 0,
    withoutToggle: _defineProperty({
      margin: '10px 0 40px',
      borderWidth: '1px'
    }, _MediaQueries.mediaQueries.breakpointTablet, {
      margin: '10px 0 15px'
    })
  }
};