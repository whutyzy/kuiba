import { Command } from 'commander'
import dev from './commands/dev'
import  create from './commands/create'
const version = require('../package.json').version
const program = new Command()

program.name(`cast-cli `).version(version).usage('<command> [options]')

program
    .command('dev')
    .option('-f --force')
    .option('-f --force', 'Force dep pre-optimization regardless of whether deps have changed')
    .description('Run cast development environment')
    .action(dev)
program.command('create <name>').description('Create cast component project').action(create)
program
    .parse()
   
