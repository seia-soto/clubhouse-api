import agent from '../structures/agent'

const updateNotifications = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/update_notifications',
    {
      body: {
        apn_token: null,
        enable_trending: [1, 2][Number(!!opts.enableTrendings)], // NOTE: Bool;
        frequency: opts.frequency - 3, // NOTE: one to five (higher is more frequent)
        is_sandbox: false,
        pause_till: [5, 1, 2, 3, 4][
          [
            false,
            'forAnHour',
            'UntilThisEvening',
            'UntilMorning',
            'ForAWeek'
          ].indexOf(opts.pauseTill) // NOTE: one of `forAnHour`, ...;
        ],
        system_enabled: -1
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default updateNotifications

export const specification = {
  success: Boolean
}
