import agent from '../structures/agent'

const getEvents = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const query = {
    page_size: opts.size || 25,
    page: opts.page || 1
  }

  if (opts.is_filtered) {
    query.is_filtered = opts.isFiltered || true // NOTE: [true, false, undefined]['Upcoming For You', 'All Upcoming', 'My Events']
  }

  const response = await agent(
    '/get_events',
    {
      query
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getEvents

export const specification = {
  count: Number,
  events: [
    {
      channel: String,
      club: {
        club_id: Number,
        description: String,
        enable_private: Boolean,
        is_admin: Number, // Numeric-bool
        is_community: Boolean,
        is_follow_allowed: Boolean,
        is_membership_private: Boolean,
        name: String,
        num_followers: Number,
        num_members: Number,
        num_online: Number,
        photo_url: String,
        rules: [
          {
            desc: String,
            title: String
          }
        ]
      },
      club_is_follower: Number,
      club_is_member: Number,
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
      time_start: String, // 2021-02-12T15:20:00+00:00
      url: String
    }
  ],
  next: Number,
  previous: Number,
  success: Boolean
}
