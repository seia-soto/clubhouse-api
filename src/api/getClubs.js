import agent from '../structures/agent'

const getClubs = async (profile, startableOnly) => {
  'use strict'

  const response = await agent(
    '/get_clubs',
    {
      body: {
        is_startable_only: !!startableOnly
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getClubs

export const specification = {
  added_by_user_profile: null,
  club: {
    club_id: Number,
    description: String,
    enable_private: Boolean,
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
  success: Boolean
}
