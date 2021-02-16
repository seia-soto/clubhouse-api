process.env.DEBUG = '*'

// eslint-disable-next-line
require = require('esm')(module)

const fs = require('fs')
const path = require('path')

const { Client, profiles } = require('../src')

const profile = {
  ...profiles.application.a304,
  ...profiles.locales.Korean
}
const profileLoc = path.join(__dirname, '../profile.json')
let ctx = false

if (fs.existsSync(profileLoc)) {
  ctx = JSON.parse(fs.readFileSync(profileLoc))

  profile.token = ctx.tokens.auth
  profile.userId = ctx.user.user_id
  profile.deviceId = ctx.deviceId
}

const app = new Client({ profile })

const start = async () => {
  app.debug(await app.checkForUpdate())

  if (!ctx) {
    return
  }

  app.debug(await app.getOnlineFriends())
  app.debug(await app.getProfile())
  app.debug(await app.getUser(ctx.user.user_id))
  app.debug(await app.getChannels())
  app.debug(await app.getEvents())
}

start()
