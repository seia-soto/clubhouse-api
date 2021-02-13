import agent from '../structures/agent'

const leaveChannel = async (profile, channel) => {
  'use strict'

  const response = await agent(
    '/leave_channel',
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

export default leaveChannel

export const specification = {
  success: Boolean
}
