import 'reflect-metadata'
import execa from 'execa'
import { join, isAbsolute, sep } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = __dirname

async function runMigrations() {
  await execa.node('ace', ['migration:run'], {
    stdio: 'inherit',
  })
}

async function rollbackMigrations() {
  await execa.node('ace', ['migration:rollback'], {
    stdio: 'inherit',
  })
}

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/standalone')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

function getTestFiles() {
  let userDefined = process.argv.slice(2)[0]

  if (!userDefined) {
    return 'test/**/*.spec.ts'
  }

  if (isAbsolute(userDefined)) {
    userDefined = userDefined.replace(`${join(__dirname)}${sep}`, '')
  }

  return `${userDefined.replace(/\.(?:t|j)s$/, '')}.ts`
}

/**
 * Configure test runner
 */
configure({
  files: getTestFiles(),
  before: [runMigrations, startHttpServer],
  after: [rollbackMigrations],
})
