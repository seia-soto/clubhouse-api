import { v4 as uuidv4 } from 'uuid'

import agent from '../structures/agent'

const recordActionTrails = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  opts.type = opts.type || 'app_opened'
  opts.date = opts.date || Math.floor(Date.now() / 1000) + '.' + Math.random().toString(10).slice(-6) // NOTE: e.g. 1613453171.505264;
  opts.eventId = (opts.eventId || uuidv4()).toUpperCase()

  const response = await agent(
    '/record_action_trails',
    {
      body: {
        action_trails: [
          {
            blob_data: {
              client_event_id: opts.eventId,
              client_time_recorded: opts.date
            },
            client_event_id: opts.eventId,
            client_time_created: opts.date,
            trail_type: opts.type
          }
        ]
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default recordActionTrails

export const specification = {
  success: Boolean
}
