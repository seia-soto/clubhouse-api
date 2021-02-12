process.env.DEBUG = '*'

// eslint-disable-next-line
require = require('esm')(module)

const fs = require('fs')
const path = require('path')

const { Client, profiles } = require('../src')

const profile = {
  ...profiles.application.a297,
  ...profiles.locales.Korean
}
const profileLoc = path.join(__dirname, '../profile.json')

if (fs.existsSync(profileLoc)) {
  const ctx = JSON.parse(fs.readFileSync(profileLoc))

  profile.token = ctx.tokens.auth
  profile.userId = ctx.user.user_id
  profile.deviceId = ctx.deviceId
}

const app = new Client({ profile })

const start = async () => {
  app.debug(await app.checkForUpdate())
  app.debug(await app.getOnlineFriends())
}

start()
