"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var dev_1 = require("./commands/dev");
var create_1 = require("./commands/create");
var compile_1 = require("./commands/compile");
var build_1 = require("./commands/build");
var lint_1 = require("./commands/lint");
var jest_1 = require("./commands/jest");
var add_1 = require("./commands/add");
var version = require('../package.json').version;
var program = new commander_1.Command();
program.name("cast-cli ").version(version).usage('<command> [options]');
program
    .command('dev')
    .description('Run cast development environment')
    .action(dev_1.dev);
program.command('create <name>').description('Create cast component project').action(create_1.create);
program.command('build').description('Build cast site for production').action(build_1.build);
program.command('add <component>').description('Create a component directory').action(add_1.add);
program
    .command('compile')
    .description('Compile cast components library code')
    .option('-nu, --noUmd', 'Do not compile umd target code')
    .action(compile_1.compile);
program.command('lint').description('Lint code').action(lint_1.lint);
program
    .command('jest')
    .description('Run Jest in work directory')
    .option('-w, --watch', 'Watch files change auto jest')
    .option('-c, --component <componentName>', 'Test a specific component')
    .option('-cc --clearCache', 'Clear test cache')
    .action(jest_1.jest);
program
    .parse();
