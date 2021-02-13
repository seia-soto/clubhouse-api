import agent from '../structures/agent'

const followUser = async (profile, opts) => { // NOTE: opts = Number | Object;
  'use strict'

  if (typeof opts === 'number') {
    opts = {
      userId: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/follow',
    {
      body: {
        source: 9, // NOTE: unknown; (approx) search;
        source_topic_id: null,
        user_id: opts.userId || -1,
        user_ids: null
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default followUser

export const specification = {
  success: Boolean
}
