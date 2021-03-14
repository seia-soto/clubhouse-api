import agent from '../structures/agent'

const searchUsers = async (profile, opts) => {
  'use strict'

  if (typeof opts === 'string') {
    opts = {
      query: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/search_users',
    {
      body: {
        cofollows_only: opts.onlyCoFollows || false,
        followers_only: opts.onlyFollowers || false,
        following_only: opts.onlyFollowing || false,
        query: opts.query || '' // NOTE: String to search
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default searchUsers

export const specification = {
  count: Number,
  next: Number,
  previous: Number,
  success: Boolean,
  users: [
    {
      bio: String,
      name: String,
      photo_url: String,
      user_id: Number,
      username: String
    }
  ]
}
