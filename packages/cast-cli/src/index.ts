import { Command } from 'commander'
import { dev } from './commands/dev'
import { create } from './commands/create'
import { build } from './commands/build'
import { lint } from './commands/lint'
const version = require('../package.json').version
const program = new Command()

program.name(`cast-cli `).version(version).usage('<command> [options]')

program
    .command('dev')
    .description('Run cast development environment')
    .action(dev)

program.command('create <name>').description('Create cast component project').action(create)

program.command('build').description('Build cast site for production').action(build)

program.command('lint').description('Lint code').action(lint)

program
    .parse()
   
