"use strict";
const path = require('path');
const colors = require('colors');
let parseJson = require('parse-json');
let stripBom = require('strip-bom');
let stripComments = require('strip-json-comments');
const TSCONFIG_ERROR = colors.red(`\n\n[awesome-typescript-loader] You have \`resolveGlobs\` enabled and don't have an \`exclude\` directive in your tsconfig file. This WILL slow down your compilation. Please add:
    {
        // ...
        "exclude": [
            "node_modules",
            "bower_components"
        ]
    }
`);
function tsconfigSuggestions(config) {
    let hasExclude = config.exclude && (config.exclude.indexOf('node_modules') !== -1
        || config.exclude.indexOf('./node_modules') !== -1);
    let hasGlobIgnore = config.filesGlob && (config.filesGlob.some(item => item.indexOf('!node_modules') !== -1)
        || !config.filesGlob.some(item => item.indexOf('!./node_modules') !== -1));
    if (!hasExclude && !hasGlobIgnore) {
        console.warn(TSCONFIG_ERROR);
    }
}
exports.tsconfigSuggestions = tsconfigSuggestions;
function parseContent(contents, filename) {
    const data = stripComments(stripBom(contents));
    if (/^\s*$/.test(data)) {
        return {};
    }
    return parseJson(data, null, filename);
}
exports.parseContent = parseContent;
function buildEnumMap(tsImpl) {
    let typescriptEnumMap = {
        target: {
            'es3': tsImpl.ScriptTarget.ES3,
            'es5': tsImpl.ScriptTarget.ES5,
            'es6': tsImpl.ScriptTarget.ES6,
            'es2015': tsImpl.ScriptTarget.ES2015,
            'latest': tsImpl.ScriptTarget.Latest
        },
        module: {
            'none': tsImpl.ModuleKind.None,
            'commonjs': tsImpl.ModuleKind.CommonJS,
            'amd': tsImpl.ModuleKind.AMD,
            'umd': tsImpl.ModuleKind.UMD,
            'system': tsImpl.ModuleKind.System,
            'es6': tsImpl.ModuleKind.ES6,
            'es2015': tsImpl.ModuleKind.ES2015,
        },
        moduleResolution: {
            'node': tsImpl.ModuleResolutionKind.NodeJs,
            'classic': tsImpl.ModuleResolutionKind.Classic
        },
        jsx: {
            'preserve': tsImpl.JsxEmit.Preserve,
            'react': tsImpl.JsxEmit.React
        },
        newLine: {
            'CRLF': tsImpl.NewLineKind.CarriageReturnLineFeed,
            'LF': tsImpl.NewLineKind.LineFeed
        }
    };
    return typescriptEnumMap;
}
function rawToTsCompilerOptions(jsonOptions, projectDir, tsImpl) {
    let typescriptEnumMap = buildEnumMap(tsImpl);
    let compilerOptions = {};
    for (let key in jsonOptions) {
        if (typescriptEnumMap[key]) {
            compilerOptions[key] = typescriptEnumMap[key][jsonOptions[key].toLowerCase()];
        }
        else {
            compilerOptions[key] = jsonOptions[key];
        }
    }
    if (compilerOptions.outDir !== undefined) {
        compilerOptions.outDir = path.resolve(projectDir, compilerOptions.outDir);
    }
    if (compilerOptions.rootDir !== undefined) {
        compilerOptions.rootDir = path.resolve(projectDir, compilerOptions.rootDir);
    }
    if (compilerOptions.out !== undefined) {
        compilerOptions.out = path.resolve(projectDir, compilerOptions.out);
    }
    if (compilerOptions.outFile !== undefined) {
        compilerOptions.out = path.resolve(projectDir, compilerOptions.outFile);
    }
    return compilerOptions;
}
exports.rawToTsCompilerOptions = rawToTsCompilerOptions;
//# sourceMappingURL=tsconfig-utils.js.map