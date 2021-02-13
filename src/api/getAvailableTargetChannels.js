import agent from '../structures/agent'

const getAvailableTargetChannels = async profile => {
  'use strict'

  const response = await agent(
    '/get_create_channel_targets',
    {
      body: {}
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getAvailableTargetChannels

export const specification = {
  clubs: [
    {
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
    }
  ],
  events: [], // unknown
  success: Boolean
}
