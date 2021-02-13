import agent from '../structures/agent'

const getFollowers = async (profile, opts) => { // NOTE: opts = Number | Object;
  'use strict'

  if (typeof opts === 'number') {
    opts = {
      userId: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/get_followers',
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

export default getFollowers

export const specification = {
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
