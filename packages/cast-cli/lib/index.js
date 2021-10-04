"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var dev_1 = __importDefault(require("./commands/dev"));
var create_1 = __importDefault(require("./commands/create"));
var version = require('../package.json').version;
var program = new commander_1.Command();
program.name("cast-cli ").version(version).usage('<command> [options]');
program
    .command('dev')
    .option('-f --force')
    .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
    .description('Run cast development environment')
    .action(dev_1.default);
program.command('create <name>').description('Create cast component project').action(create_1.default);
program
    .parse();
