"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var dev_1 = require("./commands/dev");
var create_1 = require("./commands/create");
var build_1 = require("./commands/build");
var lint_1 = require("./commands/lint");
var version = require('../package.json').version;
var program = new commander_1.Command();
program.name("cast-cli ").version(version).usage('<command> [options]');
program
    .command('dev')
    .description('Run cast development environment')
    .action(dev_1.dev);
program.command('create <name>').description('Create cast component project').action(create_1.create);
program.command('build').description('Build cast site for production').action(build_1.build);
program.command('lint').description('Lint code').action(lint_1.lint);
program
    .parse();
