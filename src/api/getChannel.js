import agent from '../structures/agent'

const getChannel = async (profile, channel) => {
  'use strict'

  const response = await agent(
    '/get_channel',
    {
      body: {
        channel: channel,
        channel_id: null
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getChannel

export const specification = {
  channel: {
    creator_user_profile_id: Number,
    channel_id: Number,
    channel: String,
    topic: String,
    is_private: Boolean,
    is_social_mode: Boolean,
    url: String,
    club: {
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
          title: String,
          desc: String
        }
      ],
      num_online: Number
    },
    club_name: String,
    club_id: Number,
    welcome_for_user_profile: null, // unknown
    num_other: Number,
    has_blocked_speakers: Boolean,
    is_explore_channel: Boolean,
    num_speakers: Number,
    num_all: Number,
    users: [
      {
        user_id: Number,
        name: String,
        photo_url: String,
        is_speaker: Boolean,
        is_moderator: Boolean,
        time_joined_as_speaker: String, // 2021-02-12T13:00:49.791936+00:00
        is_followed_by_speaker: Boolean,
        is_invited_as_speaker: Boolean
      }
    ]
  },
  success: Boolean
}
