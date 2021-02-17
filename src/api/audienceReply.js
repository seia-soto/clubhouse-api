import agent from '../structures/agent'

const audienceReply = async (profile, channel, raiseHands, unraiseHands) => {
  'use strict'

  const response = await agent(
    '/audience_reply',
    {
      body: {
        channel,
        raise_hands: raiseHands || true,
        unraise_hands: unraiseHands || false
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default audienceReply

export const specification = {
  success: Boolean
}
