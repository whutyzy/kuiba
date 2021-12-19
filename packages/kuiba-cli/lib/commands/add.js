"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
var logger = __importStar(require("../shared/logger"));
var fsUtils_1 = require("../shared/fsUtils");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var lodash_1 = require("lodash");
var constant_1 = require("../shared/constant");
var kuiba_config_1 = require("../config/kuiba.config");
var kuibaConfig = (0, kuiba_config_1.getKuibaConfig)();
function add(name) {
    return __awaiter(this, void 0, void 0, function () {
        var namespace, bigCamelizeName, vueTemplate, scssTemplate, indexTemplate, testsTemplate, exampleTemplate, componentDir, testsDir, exampleDir, exampleLocalDir, docsDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    namespace = (0, lodash_1.get)(kuibaConfig, 'namespace');
                    bigCamelizeName = (0, fsUtils_1.bigCamelize)(name);
                    vueTemplate = "<template>\n  <div class=\"" + namespace + "-" + name + "\"></div>\n</template>\n\n<script lang=\"ts\">\nimport { defineComponent } from 'vue'\n\nexport default defineComponent({\n  name: '" + (0, fsUtils_1.bigCamelize)(namespace) + bigCamelizeName + "'\n})\n</script>\n\n<style lang=\"scss\">\n@import \"./" + name + ".scss\"\n</style>\n";
                    scssTemplate = "." + namespace + "-" + name + " {\n    \n}";
                    indexTemplate = "import " + bigCamelizeName + " from './" + bigCamelizeName + ".vue'\nimport type { App } from 'vue'\n\n" + bigCamelizeName + ".install = function(app: App) {\n  app.component(" + bigCamelizeName + ".name, " + bigCamelizeName + ")\n}\n\nexport const _" + bigCamelizeName + "Component = " + bigCamelizeName + "\n\nexport default " + bigCamelizeName + "\n";
                    testsTemplate = "import example from '../example'\nimport " + bigCamelizeName + " from '../index'\nimport { createApp } from 'vue'\nimport { mount } from '@vue/test-utils'\n\ntest('test " + name + " example', () => {\n  const wrapper = mount(example)\n  expect(wrapper.html()).toMatchSnapshot()\n  wrapper.unmount()\n})\n\ntest('test " + name + " plugin', () => {\n  const app = createApp({}).use(" + bigCamelizeName + ")\n  expect(app.component(" + bigCamelizeName + ".name)).toBeTruthy()\n})\n";
                    exampleTemplate = "<template>\n  <kuiba-demo-block>\n    <" + namespace + "-" + name + "/>\n  </kuiba-demo-block>\n \n</template>\n\n<script>\nimport " + bigCamelizeName + " from '..'\nimport DemoBlock from '../../../example-components/DemoBlock.vue'\n\n\n\nexport default {\n  name: '" + bigCamelizeName + "Example',\n  components: {\n    [" + bigCamelizeName + ".name]: " + bigCamelizeName + ",\n    'kuiba-demo-block': DemoBlock\n  },\n  setup() {\n     return {}\n  }\n}\n</script>\n";
                    componentDir = (0, path_1.resolve)(constant_1.SRC_DIR, name);
                    testsDir = (0, path_1.resolve)(constant_1.SRC_DIR, name, constant_1.TESTS_DIR_NAME);
                    exampleDir = (0, path_1.resolve)(constant_1.SRC_DIR, name, constant_1.EXAMPLE_DIR_NAME);
                    exampleLocalDir = (0, path_1.resolve)(constant_1.SRC_DIR, name, constant_1.EXAMPLE_DIR_NAME, constant_1.EXAMPLE_LOCALE_DIR_NAME);
                    docsDir = (0, path_1.resolve)(constant_1.SRC_DIR, name, constant_1.DOCS_DIR_NAME);
                    if ((0, fs_extra_1.pathExistsSync)(componentDir)) {
                        logger.error('component directory is existed');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Promise.all([
                            (0, fs_extra_1.outputFile)((0, path_1.resolve)(componentDir, bigCamelizeName + ".vue"), vueTemplate),
                            (0, fs_extra_1.outputFile)((0, path_1.resolve)(componentDir, name + ".scss"), scssTemplate),
                            (0, fs_extra_1.outputFile)((0, path_1.resolve)(componentDir, 'index.ts'), indexTemplate),
                            (0, fs_extra_1.outputFile)((0, path_1.resolve)(testsDir, 'index.spec.js'), testsTemplate),
                            (0, fs_extra_1.outputFile)((0, path_1.resolve)(exampleDir, 'index.vue'), exampleTemplate),
                            (0, fs_extra_1.outputFile)((0, path_1.resolve)(docsDir, 'zh-CN.md'), ''),
                            (0, fs_extra_1.outputFile)((0, path_1.resolve)(docsDir, 'en-US.md'), '')
                        ])];
                case 1:
                    _a.sent();
                    logger.success("Create " + name + " success!");
                    logger.success("----------------------------");
                    logger.success(name + "/");
                    logger.success("|- __tests__/ # Unit test folder");
                    logger.success("|- docs/ # Internationalized document folder");
                    logger.success("|- example/ # Mobile phone example code");
                    logger.success("|- example/locale # Example locale");
                    logger.success("|- " + bigCamelizeName + ".vue # Sfc component, You can also use jsx or tsx");
                    logger.success("|- index.ts # Component entry, the folder where the file exists will be exposed to the user");
                    return [2 /*return*/];
            }
        });
    });
}
exports.add = add;
