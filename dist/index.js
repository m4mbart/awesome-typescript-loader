"use strict";
var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var childProcess = require('child_process');
var colors = require('colors');
var host_1 = require('./host');
var deps_1 = require('./deps');
var cache_1 = require('./cache');
var helpers = require('./helpers');
var helpers_1 = require('./helpers');
var loaderUtils = require('loader-utils');
var deasync = require('deasync');
var pkg = require('../package.json');
var cachePromise = Promise.promisify(cache_1.cache);
function getRootCompiler(compiler) {
    if (compiler.parentCompilation) {
        return getRootCompiler(compiler.parentCompilation.compiler);
    }
    else {
        return compiler;
    }
}
function getInstanceStore(compiler) {
    var store = getRootCompiler(compiler)._tsInstances;
    if (store) {
        return store;
    }
    else {
        throw new Error('Can not resolve instance store');
    }
}
function ensureInstanceStore(compiler) {
    var rootCompiler = getRootCompiler(compiler);
    if (!rootCompiler._tsInstances) {
        rootCompiler._tsInstances = {};
    }
}
function resolveInstance(compiler, instanceName) {
    return getInstanceStore(compiler)[instanceName];
}
function createResolver(compiler, webpackResolver) {
    var externals = compiler.options.externals;
    var resolver = Promise.promisify(webpackResolver);
    function resolve(base, dep) {
        if (externals && externals.hasOwnProperty(dep)) {
            return Promise.resolve('%%ignore');
        }
        else {
            return resolver(base, dep);
        }
    }
    return resolve;
}
function createChecker(compilerInfo, compilerOptions) {
    var checker = childProcess.fork(path.join(__dirname, 'checker.js'));
    checker.send({
        messageType: 'init',
        payload: {
            compilerInfo: _.omit(compilerInfo, 'tsImpl'),
            compilerOptions: compilerOptions
        }
    }, null);
    checker.inProgress = false;
    checker.compilerInfo = compilerInfo;
    checker.compilerOptions = compilerOptions;
    checker.on('message', function (msg) {
        if (msg.messageType == 'progress') {
            checker.inProgress = msg.payload.inProgress;
        }
    });
    return checker;
}
function resetChecker(checker) {
    if (checker.inProgress) {
        checker.kill('SIGKILL');
        return createChecker(checker.compilerInfo, checker.compilerOptions);
    }
    else {
        return checker;
    }
}
var COMPILER_ERROR = colors.red("\n\nTypescript compiler cannot be found, please add it to your package.json file:\n    npm install --save-dev typescript\n");
var BABEL_ERROR = colors.red("\n\nBabel compiler cannot be found, please add it to your package.json file:\n    npm install --save-dev babel\n");
function ensureInstance(webpack, options, instanceName) {
    ensureInstanceStore(webpack._compiler);
    var exInstance = resolveInstance(webpack._compiler, instanceName);
    if (exInstance) {
        return exInstance;
    }
    var tsFlow = Promise.resolve();
    var compilerName = options.compiler || 'typescript';
    var compilerPath = path.dirname(compilerName);
    if (compilerPath == '.') {
        compilerPath = compilerName;
    }
    var tsImpl;
    try {
        tsImpl = require(compilerName);
    }
    catch (e) {
        console.error(e);
        console.error(COMPILER_ERROR);
        process.exit(1);
    }
    var libPath = path.join(compilerPath, 'lib', 'lib.d.ts');
    var lib6Path = path.join(compilerPath, 'lib', 'lib.es6.d.ts');
    try {
        require.resolve(libPath);
    }
    catch (e) {
        libPath = path.join(compilerPath, 'bin', 'lib.d.ts');
        lib6Path = path.join(compilerPath, 'bin', 'lib.es6.d.ts');
    }
    var compilerInfo = {
        compilerName: compilerName,
        compilerPath: compilerPath,
        tsImpl: tsImpl,
        lib5: helpers_1.loadLib(libPath),
        lib6: helpers_1.loadLib(lib6Path)
    };
    var fileExists = function (file) {
        try {
            var stats = fs.lstatSync(file);
            return stats.isFile();
        }
        catch (e) {
            return false;
        }
    };
    var configFileName = tsImpl.findConfigFile(options.tsconfig || process.cwd(), fileExists);
    var configFile = null;
    var tsConfigFiles = [];
    if (configFileName) {
        configFile = tsImpl.readConfigFile(configFileName, function (path) { return fs.readFileSync(path).toString(); });
        if (configFile.error) {
            throw configFile.error;
        }
        if (configFile.config) {
            _.extend(options, configFile.config.compilerOptions);
            _.extend(options, configFile.config.awesomeTypescriptLoaderOptions);
            tsConfigFiles = configFile.config.files || tsConfigFiles;
        }
    }
    if (typeof options.moduleResolution === "string") {
        var moduleTypes = {
            "node": tsImpl.ModuleResolutionKind.NodeJs,
            "classic": tsImpl.ModuleResolutionKind.Classic
        };
        options.moduleResolution = moduleTypes[options.moduleResolution];
    }
    if (typeof options.emitRequireType === 'undefined') {
        options.emitRequireType = true;
    }
    else {
        if (typeof options.emitRequireType === 'string') {
            options.emitRequireType = options.emitRequireType === 'true';
        }
    }
    if (typeof options.reEmitDependentFiles === 'undefined') {
        options.reEmitDependentFiles = false;
    }
    else {
        if (typeof options.reEmitDependentFiles === 'string') {
            options.reEmitDependentFiles = options.reEmitDependentFiles === 'true';
        }
    }
    if (typeof options.doTypeCheck === 'undefined') {
        options.doTypeCheck = true;
    }
    else {
        if (typeof options.doTypeCheck === 'string') {
            options.doTypeCheck = options.doTypeCheck === 'true';
        }
    }
    if (typeof options.forkChecker === 'undefined') {
        options.forkChecker = false;
    }
    else {
        if (typeof options.forkChecker === 'string') {
            options.forkChecker = options.forkChecker === 'true';
        }
    }
    if (typeof options.useWebpackText === 'undefined') {
        options.useWebpackText = false;
    }
    else {
        if (typeof options.useWebpackText === 'string') {
            options.useWebpackText = options.useWebpackText === 'true';
        }
    }
    if (typeof options.jsx !== 'undefined') {
        switch (options.jsx) {
            case 'react':
                options.jsx = tsImpl.JsxEmit.React;
                break;
            case 'preserve':
                options.jsx = tsImpl.JsxEmit.Preserve;
                break;
        }
    }
    if (typeof options.externals == 'undefined') {
        options.externals = [];
    }
    if (configFileName) {
        var configFilePath_1 = path.dirname(configFileName);
        options.externals = options.externals.concat(tsConfigFiles
            .filter(function (file) { return /\.d\.ts$/.test(file); })
            .map(function (file) { return path.resolve(configFilePath_1, file); }));
    }
    if (options.target) {
        options.target = helpers.parseOptionTarget(options.target, tsImpl);
    }
    var babelImpl;
    if (options.useBabel) {
        try {
            babelImpl = require(path.join(process.cwd(), 'node_modules', 'babel'));
        }
        catch (e) {
            console.error(BABEL_ERROR);
            process.exit(1);
        }
    }
    var cacheIdentifier = null;
    if (options.useCache) {
        if (!options.cacheDirectory) {
            options.cacheDirectory = path.join(process.cwd(), '.awcache');
        }
        if (!fs.existsSync(options.cacheDirectory)) {
            fs.mkdirSync(options.cacheDirectory);
        }
        cacheIdentifier = {
            'typescript': tsImpl.version,
            'awesome-typescript-loader': pkg.version,
            'awesome-typescript-loader-query': webpack.query,
            'babel-core': babelImpl
                ? babelImpl.version
                : null
        };
    }
    var forkChecker = options.forkChecker && getRootCompiler(webpack._compiler)._tsFork;
    var syncResolver = deasync(webpack.resolve);
    var tsState = new host_1.State(options, webpack._compiler.inputFileSystem, compilerInfo, syncResolver);
    var compiler = webpack._compiler;
    compiler.plugin('watch-run', function (watching, callback) {
        var resolver = createResolver(watching.compiler, watching.compiler.resolvers.normal.resolve);
        var instance = resolveInstance(watching.compiler, instanceName);
        var state = instance.tsState;
        var mtimes = watching.compiler.watchFileSystem.watcher.mtimes;
        var changedFiles = Object.keys(mtimes);
        changedFiles.forEach(function (changedFile) {
            state.fileAnalyzer.validFiles.markFileInvalid(changedFile);
        });
        Promise.all(changedFiles.map(function (changedFile) {
            if (/\.ts$|\.d\.ts|\.tsx$/.test(changedFile)) {
                return state.readFileAndUpdate(changedFile).then(function () {
                    return state.fileAnalyzer.checkDependencies(resolver, changedFile);
                });
            }
            else {
                return Promise.resolve();
            }
        }))
            .then(function (_) { state.updateProgram(); callback(); })
            .catch(deps_1.ResolutionError, function (err) {
            console.error(err.message);
            callback();
        })
            .catch(function (err) { console.log(err); callback(); });
    });
    if (options.doTypeCheck) {
        compiler.plugin('after-compile', function (compilation, callback) {
            var instance = resolveInstance(compilation.compiler, instanceName);
            var state = instance.tsState;
            if (forkChecker) {
                var payload = {
                    files: state.allFiles(),
                    resolutionCache: state.host.moduleResolutionHost.resolutionCache
                };
                instance.checker.send({
                    messageType: 'compile',
                    payload: payload
                });
            }
            else {
                var diagnostics = state.ts.getPreEmitDiagnostics(state.program);
                var emitError = function (err) {
                    if (compilation.bail) {
                        console.error('Error in bail mode:', err);
                        process.exit(1);
                    }
                    compilation.errors.push(new Error(err));
                };
                var errors = helpers.formatErrors(instanceName, diagnostics);
                errors.forEach(emitError);
            }
            var phantomImports = [];
            state.allFileNames().forEach(function (fileName) {
                if (!instance.compiledFiles[fileName]) {
                    phantomImports.push(fileName);
                }
            });
            instance.compiledFiles = {};
            compilation.fileDependencies.push.apply(compilation.fileDependencies, phantomImports);
            compilation.fileDependencies = _.uniq(compilation.fileDependencies);
            callback();
        });
    }
    return getInstanceStore(webpack._compiler)[instanceName] = {
        tsFlow: tsFlow,
        tsState: tsState,
        babelImpl: babelImpl,
        compiledFiles: {},
        options: options,
        externalsInvoked: false,
        checker: forkChecker
            ? createChecker(compilerInfo, options)
            : null,
        cacheIdentifier: cacheIdentifier
    };
}
function loader(text) {
    compiler.call(undefined, this, text);
}
function compiler(webpack, text) {
    if (webpack.cacheable) {
        webpack.cacheable();
    }
    var options = loaderUtils.parseQuery(webpack.query);
    var instanceName = options.instanceName || 'default';
    var instance = ensureInstance(webpack, options, instanceName);
    var state = instance.tsState;
    var callback = webpack.async();
    var fileName = webpack.resourcePath;
    var resolver = createResolver(webpack._compiler, webpack.resolve);
    var isDepsApplied = false;
    var depsInjector = {
        add: function (depFileName) { webpack.addDependency(depFileName); },
        clear: webpack.clearDependencies.bind(webpack)
    };
    var applyDeps = _.once(function () {
        depsInjector.clear();
        depsInjector.add(fileName);
        state.fileAnalyzer.dependencies.applyCompiledFiles(fileName, depsInjector);
        if (state.options.reEmitDependentFiles) {
            state.fileAnalyzer.dependencies.applyChain(fileName, depsInjector);
        }
    });
    if (options.externals && !instance.externalsInvoked) {
        instance.externalsInvoked = true;
        instance.tsFlow = instance.tsFlow.then(function () {
            return Promise.all(options.externals.map(function (external) {
                return state.fileAnalyzer.checkDependencies(resolver, external);
            }));
        });
    }
    instance.tsFlow = instance.tsFlow
        .then(function () {
        instance.compiledFiles[fileName] = true;
        var doUpdate = false;
        if (instance.options.useWebpackText) {
            if (state.updateFile(fileName, text, true)) {
                doUpdate = true;
            }
        }
        return state.fileAnalyzer.checkDependencies(resolver, fileName).then(function (wasChanged) {
            if (doUpdate || wasChanged) {
                state.updateProgram();
            }
        });
    })
        .then(function () {
        var compiledModule;
        if (instance.options.usePrecompiledFiles) {
            compiledModule = cache_1.findCompiledModule(fileName);
        }
        if (compiledModule) {
            state.fileAnalyzer.dependencies.addCompiledModule(fileName, compiledModule.fileName);
            return {
                text: compiledModule.text,
                map: JSON.parse(compiledModule.map)
            };
        }
        else {
            function transform() {
                var resultText;
                var resultSourceMap;
                var output = state.emit(fileName);
                var result = helpers.findResultFor(output, fileName);
                if (result.text === undefined) {
                    throw new Error('No output found for ' + fileName);
                }
                resultText = result.text;
                resultSourceMap = JSON.parse(result.sourceMap);
                resultSourceMap.sources = [fileName];
                resultSourceMap.file = fileName;
                resultSourceMap.sourcesContent = [text];
                if (instance.options.useBabel) {
                    var defaultOptions = {
                        inputSourceMap: resultSourceMap,
                        filename: fileName,
                        sourceMap: true
                    };
                    var babelResult = instance.babelImpl.transform(resultText, defaultOptions);
                    resultText = babelResult.code;
                    resultSourceMap = babelResult.map;
                }
                return {
                    text: resultText,
                    map: resultSourceMap
                };
            }
            if (instance.options.useCache) {
                return cachePromise({
                    source: text,
                    identifier: instance.cacheIdentifier,
                    directory: instance.options.cacheDirectory,
                    options: webpack.query,
                    transform: transform
                });
            }
            else {
                return transform();
            }
        }
    })
        .then(function (transform) {
        var resultText = transform.text;
        var resultSourceMap = transform.map;
        if (resultSourceMap) {
            resultSourceMap.sources = [fileName];
            resultSourceMap.file = fileName;
            resultSourceMap.sourcesContent = [text];
        }
        applyDeps();
        isDepsApplied = true;
        try {
            callback(null, resultText, resultSourceMap);
        }
        catch (e) {
            console.error('Error in bail mode:', e);
            process.exit(1);
        }
    })
        .finally(function () {
        if (!isDepsApplied) {
            applyDeps();
        }
    })
        .catch(deps_1.ResolutionError, function (err) {
        callback(err, helpers.codegenErrorReport([err]));
    })
        .catch(function (err) { callback(err); });
}
var ForkCheckerPlugin = (function () {
    function ForkCheckerPlugin() {
    }
    ForkCheckerPlugin.prototype.apply = function (compiler) {
        compiler.plugin("watch-run", function (params, callback) {
            compiler._tsFork = true;
            callback();
        });
    };
    return ForkCheckerPlugin;
}());
loader.ForkCheckerPlugin = ForkCheckerPlugin;
module.exports = loader;
//# sourceMappingURL=index.js.map