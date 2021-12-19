"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_CONFIG = exports.createBasePlugins = void 0;
var fs_extra_1 = require("fs-extra");
var ForkTsCheckerWebpackPlugin_1 = require("fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPlugin");
var vue_loader_1 = require("vue-loader");
var lodash_1 = require("lodash");
var kuiba_config_1 = require("./kuiba.config");
var postcss_config_1 = require("./postcss.config");
var constant_1 = require("../shared/constant");
function createBasePlugins() {
    var plugins = [new vue_loader_1.VueLoaderPlugin()];
    (0, fs_extra_1.pathExistsSync)(constant_1.TS_CONFIG) &&
        plugins.push(new ForkTsCheckerWebpackPlugin_1.ForkTsCheckerWebpackPlugin({
            typescript: {
                mode: 'write-references',
                extensions: {
                    vue: {
                        enabled: true,
                        compiler: '@vue/compiler-sfc'
                    }
                }
            },
            logger: {
                issues: 'console'
            }
        }));
    return plugins;
}
exports.createBasePlugins = createBasePlugins;
var VUE_LOADER = {
    loader: require.resolve('vue-loader'),
    options: {
        compilerOptions: {
            preserveWhitespace: false
        }
    }
};
var CSS_LOADERS = [
    require.resolve('style-loader'),
    require.resolve('css-loader'),
    {
        loader: require.resolve('postcss-loader'),
        options: { postcssOptions: (0, postcss_config_1.getPostcssOptions)() }
    }
];
exports.BASE_CONFIG = {
    target: 'web',
    entry: {
        pc: constant_1.SITE_PC_MAIN,
        mobile: constant_1.SITE_MOBILE_MAIN
    },
    resolve: {
        extensions: constant_1.WEBPACK_RESOLVE_EXTENSIONS,
        symlinks: false,
        alias: {
            '@config': constant_1.SITE_CONFIG,
            '@pc-routes': constant_1.SITE_PC_ROUTES,
            '@mobile-routes': constant_1.SITE_MOBILE_ROUTES
        }
    },
    stats: 'errors-warnings',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [VUE_LOADER]
            },
            {
                test: /\.md$/,
                use: [
                    VUE_LOADER,
                    {
                        loader: require.resolve('@kuiba/markdown-loader'),
                        options: {
                            style: (0, lodash_1.get)((0, kuiba_config_1.getKuibaConfig)(), 'highlight.style')
                        }
                    }
                ]
            },
            {
                test: /\.(js|ts|jsx|tsx)$/,
                use: [require.resolve('babel-loader')],
                exclude: /node_modules\/(?!(@varlet\/cli))/
            },
            {
                test: /\.css$/,
                use: CSS_LOADERS
            },
            {
                test: /\.(scss|sass)$/,
                use: __spreadArray(__spreadArray([], __read(CSS_LOADERS), false), [require.resolve('sass-loader')], false)
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset',
                generator: {
                    filename: 'fonts/[hash][ext][query]'
                }
            },
            {
                test: /\.(mp3|wav|ogg|acc)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'audio/[hash][ext][query]'
                }
            },
            {
                test: /\.(mp4|webm)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'video/[hash][ext][query]'
                }
            }
        ]
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
    plugins: createBasePlugins()
};
