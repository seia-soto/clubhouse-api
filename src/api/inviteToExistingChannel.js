import agent from '../structures/agent'

const inviteToExistingChannel = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/invite_to_existing_channel',
    {
      body: {
        channel: opts.channel || 0, // NOTE: Channel Id;
        user_ids: opts.user || 0 // NOTE: User Id;
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default inviteToExistingChannel

export const specification = {
  fallback_message: String,
  fallback_number_hash: Number,
  notifications_enabled: Boolean,
  success: Boolean
}
