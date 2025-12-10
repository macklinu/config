import * as path from 'node:path'
import { styleText } from 'node:util'

import { detectPackageManager, installPackage } from '@antfu/install-pkg'
import { consola } from 'consola'
import * as fs from 'fs'

export const init = async ({ cwd = process.cwd() }: { cwd?: string } = {}) => {
  const resolvePath = (filePath: string): string => path.resolve(cwd, filePath)

  if (!fs.existsSync(resolvePath('package.json'))) {
    throw new Error('package.json required to set up ESLint')
  }

  const packageManager = await detectPackageManager(cwd)

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
  await installPackage(devDependencies, {
    dev: true,
    silent: true,
    cwd,
    packageManager,
  })

  if (fs.existsSync(resolvePath('eslint.config.js'))) {
    consola.warn('eslint.config.js already exists - skipping')
  } else {
    consola.info('Creating %s', styleText('bold', 'eslint.config.js'))
    await fs.promises.writeFile(
      resolvePath('eslint.config.js'),
      [
        "import config from '@macklinu/eslint-config'",
        '',
        'export default [...config]',
      ].join('\n')
    )
  }

  if (fs.existsSync(resolvePath('.vscode/settings.json'))) {
    consola.warn('.vscode/settings.json already exists - skipping')
  } else {
    consola.info(
      'Writing preferred ESLint VSCode config to .vscode/settings.json'
    )

    await fs.promises.mkdir(resolvePath('.vscode'))
    await fs.promises.writeFile(
      resolvePath('.vscode/settings.json'),
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
}
