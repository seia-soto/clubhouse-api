import agent from '../structures/agent'

const getProfile = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/me',
    {
      body: {
        return_blocked_id: opts.includeBlocked || true,
        timezone_identifier: profile.timezone || opts.timezone, // NOTE: Asia/Seoul
        return_following_ids: opts.includeFollowings || true
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

export default getProfile

export const specification = {
  has_unread_notifications: Boolean,
  actionable_notifications_count: Number,
  num_invites: Number,
  auth_token: String,
  refresh_token: String,
  access_token: String,
  notifications_enabled: Boolean,
  user_profile: {
    user_id: Number,
    name: String,
    photo_url: String,
    username: String
  },
  following_ids: [
    Number // user identifier (User ID);
  ],
  blocked_ids: [
    Number // user identifier (User ID);
  ],
  is_admin: Boolean,
  email: String,
  feature_flags: [
    String // unknown;
  ],
  success: Boolean
}
