import agent from '../structures/agent'

const acceptSpeakerInvite = async (profile, channel, userId) => {
  'use strict'

  const response = await agent(
    '/accept_speaker_invite',
    {
      body: {
        channel,
        userId
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default acceptSpeakerInvite

export const specification = {
  success: Boolean,
  token: String,
  pubnub_token: String,
  pubnub_origin: String,
  pubnub_heartbeat_value: String,
  pubnub_heartbeat_interval: String
}
