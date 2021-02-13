import agent from '../structures/agent'

const editEvent = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/edit_event',
    {
      body: {
        clubId: opts.clubId || null,
        description: opts.description || null,
        event_hashid: opts.eventHashId || null,
        eventId: opts.eventId || null,
        is_member_only: opts.memberOnly || false,
        time_start_epoch: Math.floor(new Date(opts.startDate || Date.now()).getTime() / 1000),
        user_ids: opts.guests || []/*
          Number // NOTE: User Id;
        */
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default editEvent

export const specification = {
  success: Boolean
}
