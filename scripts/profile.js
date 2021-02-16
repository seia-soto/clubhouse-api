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

const req = {}

const init = async () => {
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
    ...profiles.application.a304,
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
    if (req.login.user_profile.name || req.login.user_profile.username) {
      quote('Detected that you ALREADY SIGNED UP!')
      console.log('You tried to call APIs to sign up again but this is not recommended.')
      console.log(JSON.stringify(req.login.user_profile, null, 2))
    }

    console.log('WARNING: <IMPORTANT> YOU ARE FIRST TIME ON CLUBHOUSE!')
    console.log('Please use real device to reduce the rate of being banned.')

    quote('Updating clubhouse-api/client profile to emulate real application...')

    client.profile.userId = req.login.user_profile.id
    client.profile.token = req.login.auth_token

    // NOTE: Sign up;
    quote('To start sign up process if you want to stop just press <CTRL + C>, otherwise <PRESS ENTER>.')

    await getAnswer(createInterface())

    quote('Please <type> your full name, which is formatted in `{firstName} {lastName}`.')
    console.log('For example, my first name is Seia and last name is Soto, then we need to put `Seia Soto`.')
    console.log('WARNING: DO NOT PUT ` CHARACTER IN REAL ANSWER.')

    const name = await getAnswer(createInterface())

    quote('We detected that your name is', name + '! To continue, please <PRESS ENTER>.')

    await getAnswer(createInterface())

    req.name = await client.updateName(name)

    if (!req.name.success) {
      console.log('ERROR: <IMPORTANT> CANNOT CONTINUE BECAUSE REQUEST FAILED!')
      console.log(req.name)

      process.exit(1)
    }

    quote('Please <type> your username to reserve below.')
    console.log('WARNING: The length of username should be 16 or lower.')

    const username = await getAnswer(createInterface())

    quote('Your username will be set as @' + username + '! To continue, please <PRESS ENTER>.')

    await getAnswer(createInterface())

    req.username = await client.updateUsername(username)

    if (!req.username.success) {
      console.log('ERROR: <IMPORTANT> CANNOT CONTINUE BECAUSE REQUEST FAILED!')
      console.log(req.name)

      process.exit(1)
    }

    quote('Calling API ends as like real client...')

    req.check = await client.checkWaitlistStatus()
    req.record = await client.recordActionTrails()

    if (!req.check.success || !req.record.success) {
      console.log('WARNING: <IMPORTANT> ONE OF REMAINING API EMULATION FAILED!')
      console.log(JSON.stringify({
        checkWaitlistStatus: req.check,
        recordActionTrail: req.record
      }, null, 2))
    }

    profile.user = {
      name,
      username
    }
  } else {
    profile.user = req.login.user_profile
  }
  if (!req.login.is_verified) {
    console.log('WARNING: Account is not verified!')
  }

  quote('Writing profile data...')

  profile.tokens = {
    access: req.login.access_token,
    auth: req.login.auth_token,
    refresh: req.login.refresh_token
  }
  profile.verified = req.login.is_verified
  profile._debug = {
    req
  }

  const data = JSON.stringify(profile, null, 2)

  console.log(data)

  quote('Saving profile data into ./profile.json')

  fs.writeFileSync('./profile.json', data, 'utf8')

  quote('All done!')
  console.log('Keep saved profile data safe as you can.')
}

try {
  init()
} catch (error) {
  console.error('ERROR!', error)
  console.log(req)
}
