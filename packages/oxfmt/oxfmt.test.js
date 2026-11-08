import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import { expect, test } from 'vitest'

const execFileAsync = promisify(execFile)
const cli = fileURLToPath(new URL('./bin/oxfmt', import.meta.resolve('oxfmt/package.json')))

test('formats a consumer project and ignores only root repos', async () => {
  const directory = await mkdtemp(new URL('.oxfmt-', import.meta.url))

  try {
    await mkdir(join(directory, 'repos', 'nested'), { recursive: true })
    await mkdir(join(directory, 'node_modules', '@macklinu'), { recursive: true })
    await symlink(
      fileURLToPath(new URL('.', import.meta.url)),
      join(directory, 'node_modules', '@macklinu', 'oxfmt-config')
    )
    await mkdir(join(directory, 'src', 'repos'), { recursive: true })
    await writeFile(
      join(directory, 'oxfmt.config.ts'),
      "import config from '@macklinu/oxfmt-config'\nexport default config\n"
    )
    await writeFile(
      join(directory, 'component.tsx'),
      'export const title = "Hello";\nexport const view = <div className="text-white p-4 flex" />;\n'
    )
    await writeFile(
      join(directory, 'package.json'),
      '{"dependencies":{"zod":"*","effect":"*"},"version":"1.0.0","name":"consumer"}\n'
    )
    const ignored = 'this is not valid TypeScript;\n'
    await writeFile(join(directory, 'repos', 'nested', 'ignored.ts'), ignored)
    await writeFile(join(directory, 'src', 'repos', 'included.ts'), 'export const value = "yes";\n')

    await execFileAsync(process.execPath, [cli, '--write', '.'], { cwd: directory })

    expect(await readFile(join(directory, 'component.tsx'), 'utf8')).toBe(
      'export const title = \'Hello\'\nexport const view = <div className="flex p-4 text-white" />\n'
    )
    expect(await readFile(join(directory, 'package.json'), 'utf8')).toBe(
      '{\n  "name": "consumer",\n  "version": "1.0.0",\n  "dependencies": {\n    "effect": "*",\n    "zod": "*"\n  }\n}\n'
    )
    expect(await readFile(join(directory, 'repos', 'nested', 'ignored.ts'), 'utf8')).toBe(ignored)
    expect(await readFile(join(directory, 'src', 'repos', 'included.ts'), 'utf8')).toBe(
      "export const value = 'yes'\n"
    )
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})
