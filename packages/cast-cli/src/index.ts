import { Command } from 'commander'
import { dev } from './commands/dev'
import { create } from './commands/create'
import { compile } from './commands/compile'
import { build } from './commands/build'
import { lint } from './commands/lint'
import { jest } from './commands/jest'
import { add } from './commands/add'

const version = require('../package.json').version
const program = new Command()

program.name(`cast-cli `).version(version).usage('<command> [options]')

program
    .command('dev')
    .description('Run cast development environment')
    .action(dev)

program.command('create <name>').description('Create cast component project').action(create)

program.command('build').description('Build cast site for production').action(build)

program.command('add <component>').description('Create a component directory').action(add)

program
    .command('compile')
    .description('Compile cast components library code')
    .option('-nu, --noUmd', 'Do not compile umd target code')
    .action(compile)

program.command('lint').description('Lint code').action(lint)
program
    .command('jest')
    .description('Run Jest in work directory')
    .option('-w, --watch', 'Watch files change auto jest')
    .option('-c, --component <componentName>', 'Test a specific component')
    .option('-cc --clearCache', 'Clear test cache')
    .action(jest)
program
    .parse()
   
