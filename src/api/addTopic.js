import agent from '../structures/agent'

const addTopic = async (profile, opts) => { // NOTE: opts = Number | Object;
  'use strict'

  if (typeof opts === 'number') {
    opts = {
      topicId: opts
    }
  }

  opts = opts || {}

  const response = await agent(
    '/add_user_topic',
    {
      body: {
        club_id: null,
        topic_id: opts.topicId || -1
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default addTopic

export const specification = {
  success: Boolean
}
