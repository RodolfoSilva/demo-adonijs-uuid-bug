process.env.DEBUG = 'adonis:require-ts'
require('@adonisjs/require-ts/build/register')
require('reflect-metadata')

const { join } = require('path')
const { configure } = require('japa')
const execa = require('execa')
const getPort = require('get-port')

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname, '..')
process.env.APP_KEY = 'verylongandrandom32charsecretkey'

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
  process.env.PORT = String(await getPort())
  const { Ignitor } = require('@adonisjs/core/build/standalone')
  await new Ignitor(__dirname).httpServer().start()
}

/**
 * Configure test runner
 */
configure({
  files: ['test/**/*.spec.ts'],
  before: [runMigrations, startHttpServer],
  after: [rollbackMigrations],
})
