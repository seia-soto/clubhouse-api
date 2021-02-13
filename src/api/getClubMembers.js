import agent from '../structures/agent'

const getClubMembers = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/get_club_members',
    {
      query: {
        club_id: opts.clubId || -1,
        return_followers: Number(!!opts.returnFollowers) || 0,
        return_members: Number(!!opts.returnMembers) || 1,
        page_size: opts.size || 50,
        page: opts.page || 1
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getClubMembers

export const specification = {
  count: Number,
  next: Number,
  previous: Number,
  success: Boolean,
  users: [
    {
      bio: String,
      is_admin: Boolean,
      is_follower: Boolean,
      is_member: Boolean,
      is_pending_accept: Boolean,
      is_pending_approval: Boolean,
      name: String,
      photo_url: String,
      user_id: Number,
      username: String
    }
  ]
}
