import { detectPackageManager, installPackage } from '@antfu/install-pkg'
import { program } from 'commander'
import { consola } from 'consola'
import fs from 'fs'
import path from 'path'
import { styleText } from 'util'

import { version } from '../package.json'

program
  .version(version)
  .command('init')
  .description('Sets up ESLint with @macklinu/eslint-config')
  .action(async () => {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json required to set up ESLint')
    }

    const packageManager = await detectPackageManager()
    if (!packageManager) {
      throw new Error(
        'Could not determine package manager to use to installation'
      )
    }

    const devDependencies = ['eslint', '@macklinu/eslint-config']
    consola.info(
      'Installing %s with %s',
      styleText('bold', devDependencies.join(' ')),
      styleText('bold', packageManager)
    )
    await installPackage(devDependencies, { dev: true, silent: true })

    if (fs.existsSync(path.resolve(process.cwd(), 'eslint.config.js'))) {
      consola.warn('eslint.config.js already exists - skipping')
    } else {
      consola.info('Creating %s', styleText('bold', 'eslint.config.js'))
      await fs.promises.writeFile(
        'eslint.config.js',
        [
          "import config from '@macklinu/eslint-config'",
          '',
          'export default [...config]',
        ].join('\n')
      )
    }

    if (fs.existsSync(path.resolve(process.cwd(), '.vscode/settings.json'))) {
      consola.warn('.vscode/settings.json already exists - skipping')
    } else {
      consola.info(
        'Writing preferred ESLint VSCode config to .vscode/settings.json'
      )
      await fs.promises.mkdir('.vscode')
      await fs.promises.writeFile(
        path.resolve(process.cwd(), '.vscode/settings.json'),
        JSON.stringify(
          {
            'editor.codeActionsOnSave': {
              'source.fixAll': 'explicit',
            },
          },
          null,
          2
        )
      )
    }
  })

program.parse()
