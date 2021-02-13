import agent from '../structures/agent'

const makeChannelPublic = async (profile, channel) => {
  'use strict'

  const response = await agent(
    '/make_channel_public',
    {
      body: {
        channel, // NOTE: channel-uid;
        channel_id: null
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default makeChannelPublic

export const specification = {
  success: Boolean
}
