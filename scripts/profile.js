const fs = require('fs')
const readline = require('readline')
const { v4: uuidv4 } = require('uuid')

const { Client, profiles } = require('../src')

const createInterface = () => readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
const getAnswer = shell => {
  return new Promise((resolve, reject) => {
    if (!shell) {
      reject(new Error('No command line interface provided!'))
    }

    shell.on('line', line => {
      shell.close()

      resolve(String(line))
    })
  })
}

const quote = (f, ...message) => {
  console.log('\n- ' + f, ...message)
}

module.exports = (async () => {
  process.title = 'Seia-Soto/clubhouse-api - Interactive authentication shell'

  console.log(`by Seia-Soto
    Seia-Soto/clubhouse-api
     - Interactive authentication shell

    <THIS SCRIPT COMES WITHOUT WARRENTY>

    This script is created to generate new access tokens via API.
    Also, this only runs at your computer, means that you don't need to worry about privacy.
    However, if you're using the shell in remote environment without encryption, or using in public spaces, you may need to manually remove your personal informations.
  `)

  quote('Please <type> generated device id(UUID) if you have used this tool before, otherwise <press enter> to continue')

  let deviceId = (await getAnswer(createInterface())).toUpperCase()

  if (!deviceId) {
    deviceId = uuidv4().toUpperCase()

    quote('generated new device id for you:', deviceId)
  }

  quote('Please <type> valid phone number below.')
  console.log('For example, let me assume that you have one Korean number: +82 10-1234-5678')
  console.log('Then put: +821012345678')

  const phoneNumberInput = await getAnswer(createInterface())
  const phoneNumberMatch = /\+(\d{2})(\d+)/.exec(phoneNumberInput)

  if (!phoneNumberInput || !phoneNumberMatch || phoneNumberMatch.length < 3) {
    console.log('ERROR: Please, put valid phone number!')

    process.exit(0)
  }

  quote('Please <type> your language to use.')

  const languages = Object.keys(profiles.locales)

  for (let i = 0, l = languages.length; i < l; i++) {
    console.log('  -', languages[i])
  }

  const language = await getAnswer(createInterface())

  if (!language || !profiles.locales[language]) {
    console.log('ERROR: Please, put valid language!')

    process.exit(0)
  }

  const [phoneNumber, phoneNumberNation, phoneNumberUser] = phoneNumberMatch

  const profile = {
    ...profiles.application.a297,
    ...profiles.locales[language],
    deviceId
  }

  quote('Please <press enter> if following information is correct and start authentication.')
  console.log(JSON.stringify({
    profile,
    user: {
      phoneNumber,
      phoneNumberNation,
      phoneNumberUser
    }
  }, null, 2))

  await getAnswer(createInterface())

  const client = new Client({
    profile
  })
  const req = {}

  quote('Checking for application update...')

  req.update = await client.checkForUpdate()

  if (!req.update.success) {
    console.log('ERROR: <IMPORTANT> REQUEST TO SIMPLELY CHECK APP STATUS FAILED!')
    console.log('PLEASE CONSIDER STOPPING HERE BY PRESSING <CTRL + C> TO PREVENT "ACCOUNT BAN", OTHERWISE TO CONTINUE <PRESS ENTER>.')

    console.log(req.update)

    await getAnswer(createInterface())
  }
  if (req.update.is_mandatory) {
    console.log('ERROR: <IMPORTANT> APPLICATION IS OLD!')
    console.log('We cannot continue because this version of application is not supported by server anymore.')
    console.log('Please update the library or try again.')
    console.log(req.update)

    process.exit(1)
  }

  quote('Requesting verification code...')

  req.auth = await client.requestMobileAuth(phoneNumber)

  if (!req.auth.success) {
    console.log('ERROR: <IMPORTANT> CANNOT CONTINUE BECAUSE REQUEST FAILED!')
    console.log(req.auth)

    process.exit(1)
  }
  if (req.auth.is_blocked) {
    console.log('ERROR: <IMPORTANT> YOUR PHONE NUMBER HAS BEEN BLOCKED!')
    console.log('We cannot continue because your phone number is completely blocked by Clubhouse team.')
    console.log('Also, if you are real user who cannot join even you invited, please refer: https://www.reddit.com/r/ClubhouseApp/comments/lc2d89/')

    process.exit(1)
  }

  quote('Please <type> verification code that Clubhouse team sent.')

  const code = await getAnswer(createInterface())

  if (!code) {
    console.log('ERROR: Please, input valid code!')

    process.exit(0)
  }

  quote('Please <press enter> if following information is correct and complete authentication.')
  console.log(JSON.stringify({
    phoneNumber,
    code
  }, null, 2))

  await getAnswer(createInterface())

  quote('Processing your request and serializing things...')

  req.login = await client.completeMobileAuth(phoneNumber, code)

  if (!req.login.success) {
    console.log('ERROR: <IMPORTANT> CANNOT CONTINUE BECAUSE REQUEST FAILED!')
    console.log(req.login)

    process.exit(1)
  }
  if (req.login.is_waitlisted) {
    console.log('WARNING: <IMPORTANT> YOU ARE STILL ON WAITLIST!')
  }
  if (req.login.is_onboarding) {
    console.log('WARNING: <IMPORTANT> YOU ARE FIRST TIME ON CLUBHOUSE!')
    console.log('Please use real device to reduce the rate of being banned.')
  }
  if (!req.login.is_verified) {
    console.log('WARNING: Account is not verified!')
  }

  profile.user = req.login.user_profile
  profile.tokens = {
    access: req.login.access_token,
    auth: req.login.auth_token,
    refresh: req.login.refresh_token
  }
  profile.verified = req.login.is_verified

  const data = JSON.stringify(profile, null, 2)

  console.log(data)

  quote('Saving profile data into ./profile.json')

  fs.writeFileSync('./profile.json', data, 'utf8')

  quote('All done!')
  console.log('Keep saved profile data safe as you can.')
})()
