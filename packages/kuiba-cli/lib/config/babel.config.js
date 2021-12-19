"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (api, options) {
    if (options === void 0) { options = {}; }
    if (api) {
        api.cache.never();
    }
    var _a = process.env, BABEL_MODULE = _a.BABEL_MODULE, NODE_ENV = _a.NODE_ENV;
    var isTest = NODE_ENV === 'test';
    var useESModules = BABEL_MODULE !== 'commonjs' && !isTest;
    return {
        compact: false,
        presets: [
            [
                require.resolve('@babel/preset-env'),
                {
                    modules: useESModules ? false : 'commonjs',
                    loose: options.loose
                }
            ],
            require.resolve('@babel/preset-typescript'),
            require('./babel.sfc.transform')
        ],
        plugins: [
            [
                require.resolve('babel-plugin-import'),
                {
                    libraryName: '@kuiba/ui',
                    libraryDirectory: 'es',
                    style: true
                },
                '@kuiba/ui'
            ],
            [
                require.resolve('@vue/babel-plugin-jsx'),
                {
                    enableObjectSlots: options.enableObjectSlots
                }
            ]
        ]
    };
};
exports.default = module.exports;
