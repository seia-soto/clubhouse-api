import agent from '../structures/agent'

const searchClubs = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/search_clubs',
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

export default searchClubs

export const specification = {
  clubs: [
    {
      club_id: Number,
      description: String,
      is_follower: Boolean,
      is_member: Boolean,
      name: String,
      num_followers: Number,
      num_members: Number,
      photo_url: String
    }
  ],
  count: Number,
  next: Number,
  previous: Number,
  success: Boolean
}
