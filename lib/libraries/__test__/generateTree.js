'use strict';

var _generateTree = require('../generateTree');

var _generateTree2 = _interopRequireDefault(_generateTree);

var _immutable = require('immutable');

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _ava2.default)('generate components tree', function (t) {
  var componentsIndex = (0, _immutable.Map)({
    ExampleFolderButton: (0, _immutable.Map)({
      menu: 'Example Folder Button',
      name: 'ExampleFolderButton'
    })
  });
  var tree = (0, _generateTree2.default)(componentsIndex);
  var name = tree.getIn(['Example', 'Folder', 'Button']);
  var isMap = tree ? _immutable.Map.isMap(tree) : false;
  var result = isMap && name === 'ExampleFolderButton';
  t.true(result);
});