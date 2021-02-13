import agent from '../structures/agent'

const activePing = async (profile, channel) => {
  'use strict'

  const response = await agent(
    '/active_ping',
    {
      body: {
        channel,
        channel_id: null
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default activePing

export const specification = {
  should_leave: Boolean,
  success: Boolean
}
