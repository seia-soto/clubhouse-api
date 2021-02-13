import agent from '../structures/agent'

const getEvent = async (profile, opts) => { // NOTE: opts = Number | Object;
  'use strict'

  if (typeof opts === 'number') {
    opts = {
      eventId: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/get_event',
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

export default getEvent

export const specification = {
  event: {
    channel: null,
    club: null,
    description: String,
    event_id: Number,
    hosts: [
      {
        bio: String,
        name: String,
        photo_url: String,
        twitter: String,
        user_id: Number,
        username: String
      }
    ],
    is_expired: Boolean,
    is_member_only: Boolean,
    name: String,
    time_start: String, // 2021-02-14T09:00:00+00:00
    url: String
  },
  success: Boolean
}
