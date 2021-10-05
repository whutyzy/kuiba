import execa from 'execa'
import ora from 'ora'
import { resolve } from 'path'
import { isDir } from '../shared/fsUtils'
import { CWD, ESLINT_EXTENSIONS } from '../shared/constant'

import type { Ora } from 'ora'

export async function lint() {
    let spinner: Ora
    try {
       spinner = ora('prettier starting...').start()
       await execa('prettier', ['--write', '.'])
       spinner.succeed('prettier success')

       const stylelintPattern = ['./src/**/*.vue', './src/**/*.css', './src/**/*.sass']
       const hasPackages = isDir(resolve(CWD, 'packages'))
       hasPackages && stylelintPattern.push('./packages/**/*.vue', './packages/**/*.css', './packages/**/*.less')

       await execa('stylelint', [...stylelintPattern, '--fix'])
       spinner.succeed('stylelint success')

       spinner = ora('eslint starting...').start()

       const eslintPatterns: string[] = ['./src']
       const { stdout } = await execa('eslint', [
           ...eslintPatterns.filter((pattern) => isDir(resolve(CWD, pattern))),
           '--fix',
           '--ext',
           ESLINT_EXTENSIONS.join()
       ])

       const type = stdout ? 'warn' : 'succeed'
       spinner[type](stdout || 'eslint success') 
    } catch (error:any) {
        spinner!.fail(error.toString())
        process.exit(1)
    }
    
}