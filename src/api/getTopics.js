import agent from '../structures/agent'

const getTopics = async profile => {
  'use strict'

  const response = await agent(
    '/get_all_topics',
    {},
    profile
  )
  const data = await response.json()

  return data
}

export default getTopics

export const specification = {
  success: Boolean,
  topics: [
    {
      abbreviated_title: String, // Subjects
      id: Number,
      title: String,
      topics: [
        {
          abbreviated_title: String,
          id: Number,
          title: String
        }
      ]
    }
  ]
}
