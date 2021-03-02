import agent from '../structures/agent'

const getFollowing = async (profile, opts) => { // NOTE: opts = Number | Object;
  'use strict'

  if (typeof opts === 'number') {
    opts = {
      userId: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/get_following',
    {
      query: {
        user_id: opts.userId || -1,
        page_size: opts.size || 50,
        page: opts.page || 1
      }
    },
    {
      ...profile,
      userId: '(null)'
    }
  )
  const data = await response.json()

  return data
}

export default getFollowing

export const specification = {
  clubs: [
    {
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
    }
  ],
  count: Number,
  next: Number,
  previous: Number,
  success: Boolean,
  users: [
    {
      bio: String,
      last_active_minutes: Number,
      name: String,
      photo_url: String,
      twitter: String,
      user_id: Number,
      username: String
    }
  ]
}
