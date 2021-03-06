'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createBlueKit;

var _buildProps = require('./libraries/buildProps');

var _buildProps2 = _interopRequireDefault(_buildProps);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _normalizePath = require('./libraries/normalizePath');

var _normalizePath2 = _interopRequireDefault(_normalizePath);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _tosource = require('tosource');

var _tosource2 = _interopRequireDefault(_tosource);

var _reactDocgen = require('react-docgen');

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var nunjuckEnv = _nunjucks2.default.configure(__dirname + '/../nunjucks/', { autoescape: false });

nunjuckEnv.addFilter('nl2br', function (val) {
  return (val || '').replace(/\n\r?/g, '\\n');
});

function getAllFilesInDir(dir) {
  var relativeDirectory = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  var resolvedDir = _path2.default.join(dir, relativeDirectory);

  if (!_fs2.default.existsSync(resolvedDir)) return null;

  return [].concat.apply([], _fs2.default.readdirSync(resolvedDir).map(function (file) {
    var absolutePath = _path2.default.join(dir, relativeDirectory, file);

    if (_fs2.default.lstatSync(absolutePath).isDirectory()) {
      return getAllFilesInDir(dir, _path2.default.join(relativeDirectory, file));
    }

    var filePath = _path2.default.join('./' + relativeDirectory, file);
    if (!filePath.match(/\.(js|jsx)$/)) return null;
    if (filePath.match(/__test__/)) return null;
    return filePath;
  }));
}

function objectToString(object) {
  return (0, _tosource2.default)(object || {}, null, 0);
}

function getImportFile(directory, file) {
  if (directory.match(/node_modules/)) {
    var pathParts = file.replace(/\.(js|jsx)$/, '').split(_path2.default.sep);
    pathParts[1] = 'lib';
    return pathParts.join(_path2.default.sep);
  }

  return file[0] === '.' ? file : './' + file;
}

function generateComponentData(config, file, directory) {
  var filePath = _path2.default.join(directory, file);
  var content = _fs2.default.readFileSync(filePath).toString().replace('_interopRequireDefault(_react)', 'require("react")').replace(/import Component from ["']react-pure-render\/component["']/, 'import {Component} from "react"').replace(/export default .*\((\w*)\)+/m, 'export default $1');

  try {

    var docgen = (0, _reactDocgen.parse)(content, null, [].concat(_toConsumableArray(_reactDocgen.defaultHandlers), [function (documentation) {

      documentation._props.forEach(function (prop) {

        var description = prop.description;
        if (!description) {
          return;
        }
        var regexpStr = '@bluebird-([a-zA-Z0-9_\-]+)\\s*([^@$]*)';
        var matches = description.match(new RegExp(regexpStr, 'g'));
        if (matches) {
          prop.description = prop.description.replace(new RegExp(regexpStr, 'g'), '');
          matches.forEach(function (match) {

            var innerMacthes = match.match(new RegExp(regexpStr));
            if (!prop.bluebird) {
              prop.bluebird = {};
            }
            prop.bluebird[innerMacthes[1]] = innerMacthes[2];
          });
        }
      });
    }, function (documentation) {

      documentation._props.forEach(function (prop) {

        var description = prop.description;
        if (!description) {
          return;
        }

        prop.description = (0, _marked2.default)(prop.description);
      });
    }]));

    var doc = _extends({}, docgen, {
      propsDefinition: objectToString(docgen.props)
    });

    var normalizedFile = (0, _normalizePath2.default)(file);
    var menu = normalizedFile.replace(/\.\.\//g, '').replace('.react', '').replace(/\.(js|jsx)$/, '').replace(/(?:^|\/)(\w)/g, function (_, c) {
      return c ? ' ' + c.toUpperCase() : '';
    }).replace(/(?:^|[-_])(\w)/g, function (_, c) {
      return c ? '' + c.toUpperCase() : '';
    }).replace(/\//g, '').trim();

    var name = menu.replace(/\W/g, '');

    var importFile = (0, _normalizePath2.default)(getImportFile(directory, file));
    var componentName = normalizedFile.replace(/.*\//, '').split('.')[0];
    var simpleProps = objectToString((0, _buildProps2.default)(docgen.props));
    var fullProps = objectToString((0, _buildProps2.default)(docgen.props, true));

    return _extends({
      file: importFile,
      componentName: componentName,
      menu: menu,
      name: name,
      simpleProps: simpleProps,
      fullProps: fullProps
    }, doc);
  } catch (error) {
    if (error.message !== 'No suitable component definition found.') console.error('\u001b[31mError parsing component ' + file + ': ' + error.message + '\u001b[0m', error.stack); // eslint-disable-line no-console
    else console.warn('\u001b[33m No suitable component definition found in ' + file + '\u001b[0m'); // eslint-disable-line no-console
    return null;
  }
}

function getValidFiles(files) {
  return [].concat.apply([], files).filter(function (file) {
    return !!file;
  });
}

function createBlueKit(config) {
  var buildCommand = config.buildCommand;
  var watchCommand = config.watchCommand;
  var gulp = config.gulp;


  var gulpRuntime = gulp || _gulp2.default;
  var buildCommandName = buildCommand || 'build-bluekit';
  var watchCommandName = watchCommand || 'watch-bluekit';

  var watch = function watch() {
    var watchPaths = config.paths.map(function (file) {
      return _path2.default.relative(process.cwd(), _path2.default.join(config.baseDir, file, '**/*.js'));
    });

    console.log('Watching BlueKit in and automatically rebuilding on paths:'); // eslint-disable-line no-console
    console.log(watchPaths.join('\n')); // eslint-disable-line no-console
    gulpRuntime.watch(watchPaths, [buildCommandName]);
  };

  gulpRuntime.task(buildCommandName, function () {
    console.log('Rebuilding BlueKit'); // eslint-disable-line no-console
    generate();
  });

  gulpRuntime.task(watchCommandName, function () {
    watch();
  });

  function generate() {
    var files = config.paths.map(function (file) {
      return getAllFilesInDir(config.baseDir, file);
    });

    var components = getValidFiles(files).map(function (file) {
      return generateComponentData(config, file, config.baseDir);
    }).filter(function (component) {
      return component !== null;
    });

    var packages = config.nodeModulesDir && config.packages ? config.packages : [];
    var packageFiles = packages.map(function (file) {
      return getAllFilesInDir(config.nodeModulesDir, _path2.default.join(file, 'lib')).concat(getAllFilesInDir(config.nodeModulesDir, _path2.default.join(file, 'dist')));
    });

    var packageComponents = getValidFiles(packageFiles).map(function (file) {
      return generateComponentData(config, file, config.nodeModulesDir);
    }).filter(function (component) {
      return component !== null;
    });

    var indexFile = _path2.default.join(config.baseDir, 'componentsIndex.js');
    _fs2.default.writeFileSync(indexFile, nunjuckEnv.render('componentsIndex.nunjucks', { components: components.concat(packageComponents) }));

    console.log('BlueKit generated components index to file: ' + indexFile); // eslint-disable-line no-console

    return function () {};
  };

  return generate;
}