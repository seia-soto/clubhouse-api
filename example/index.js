process.env.DEBUG = '*'

// eslint-disable-next-line
require = require('esm')(module)

const { Client, profiles } = require('../src')

const profile = {
  ...profiles.application.a297,
  ...profiles.locales.Korean
}
const app = new Client({ profile })

const start = async () => {
  app.debug(await app.checkForUpdate())
}

start()
