import { promises } from 'fs'
// eslint-disable-next-line import/default
import globby from 'globby'
import prettier from 'prettier'
import { src } from '../../static.config'

const regex = /--([\w-]+):\s*([^;]+);/g

const createCssVariableLine = (name: string) =>
  `export const ${name} = 'var(--${name})'`

const format = async ({ filepath, text }: { filepath: string; text: string }) =>
  prettier.format(text, {
    ...((await prettier.resolveConfig(filepath)) || {}),
    filepath,
  })

async function cssVariables() {
  const cssFiles = await globby(src('css', '**/*.css'))

  const cssContents = await Promise.all(
    cssFiles.map(path => promises.readFile(path, 'utf-8'))
  )

  const allCss = cssContents.join('\n\n')

  const text = [...allCss.matchAll(regex)]
    .map(match => match[1])
    .map(createCssVariableLine)
    .join('\n')

  const filepath = src('constants', 'css-variables.generated.ts')

  return promises.writeFile(filepath, await format({ filepath, text }))
}

async function main() {
  await Promise.all([cssVariables()])
}

main().catch(err => {
  console.error(err)
  // eslint-disable-next-line no-process-exit
  process.exit(1)
})
