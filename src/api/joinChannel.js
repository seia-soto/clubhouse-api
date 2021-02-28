import agent from '../structures/agent'

const joinChannel = async (profile, opts) => {
  'use strict'

  opts = opts || {}
  opts.source = opts.source || 'feed'

  const attributions = {
    is_explore: opts.isExplore,
    rank: opts.rank
  }
  const body = {}

  if (opts.source === 'feed') {
    body.attribution_details = Buffer.from(JSON.stringify(attributions)).toString('base64')
    body.attribution_source = opts.source || 'feed'
  }

  body.channel = opts.channel

  const response = await agent(
    '/join_channel',
    {
      body
    },
    profile
  )
  const data = await response.json()

  return data
}

export default joinChannel

export const specification = {
  agora_native_mute: Boolean,
  channel: String,
  channel_id: Number,
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
    photo_url: String,
    rules: [
      {
        desc: String,
        title: String
      }
    ]
  },
  club_id: Number,
  club_name: String,
  creator_user_profile_id: Number,
  handraise_permission: Number, // Numeric-bool
  is_club_admin: Boolean,
  is_club_member: Boolean,
  is_empty: Boolean,
  is_handraise_enabled: Boolean,
  is_private: Boolean,
  is_social_mode: Boolean,
  pubnub_heartbeat_interval: Number, // In-second;
  pubnub_heartbeat_value: Number,
  pubnub_origin: null,
  pubnub_token: String,
  rtm_token: String,
  success: Boolean,
  token: String,
  topic: String,
  url: String,
  users: [
    {
      first_name: String,
      is_followed_by_speaker: Boolean,
      is_invited_as_speaker: Boolean,
      is_moderator: Boolean,
      is_new: Boolean,
      is_speaker: Boolean,
      name: String,
      photo_url: String,
      skintone: Number, // (approx) zero to five
      time_joined_as_speaker: String, // 2021-02-12T16:12:23.593715+00:00
      user_id: Number,
      username: String
    }
  ],
  welcome_for_user_profile: null
}
