import agent from '../structures/agent'

const getUsersOfTopic = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/get_users_for_topic',
    {
      query: {
        topic_id: opts.topicId || 1,
        page_size: opts.size || 25,
        page: opts.page || 1
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getUsersOfTopic

export const specification = {
  count: Number,
  next: Number,
  previous: Number,
  success: Boolean,
  users: [
    {
      bio: String,
      name: String,
      photo_url: String,
      user_id: Number,
      username: String
    }
  ]
}
