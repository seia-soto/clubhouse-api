import agent from '../structures/agent'

const createChannel = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/create_channel',
    {
      body: {
        clubId: opts.clubId || null,
        eventId: opts.eventId || null,
        is_private: opts.isPrivate || false,
        is_social_mode: opts.isSocialized || false,
        topic: opts.topic || null,
        user_ids: opts.guests || []/*
          Number // NOTE: User Id;
        */
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default createChannel

export const specification = {
  agora_native_mute: Boolean,
  channel: String,
  channel_id: String,
  club: null,
  club_id: null,
  club_name: null,
  creator_user_profile_id: Number,
  handraise_permission: Number, // Numeric-bool
  is_club_admin: Boolean,
  is_handraise_enabled: Boolean,
  is_private: Boolean,
  is_social_mode: Boolean,
  pubnub_enable: Boolean,
  pubnub_heartbeat_interval: Number, // In-second
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
