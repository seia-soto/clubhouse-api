import agent from '../structures/agent'

const getOnlineFriends = async profile => {
  'use strict'

  const response = await agent(
    '/get_online_friends',
    {
      body: {}
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getOnlineFriends

export const specification = {
  clubs: [
    {
      club_id: Number,
      name: String,
      description: String,
      photo_url: String,
      num_members: Number,
      num_followers: Number,
      enable_private: Boolean,
      is_follow_allowed: Boolean,
      is_membership_private: Boolean,
      is_community: Boolean,
      rules: [
        {
          desc: String,
          title: String
        }
      ],
      num_online: Number,
      is_admin: Boolean,
      online_members: [
        {
          user_id: Number,
          name: String,
          photo_url: String,
          username: String
        }
      ]
    }
  ],
  users: [
    {
      user_id: Number,
      name: String,
      photo_url: String,
      username: String,
      last_active_minutes: Number,
      channel: String,
      is_speaker: Boolean,
      topic: String
    }
  ]
}
