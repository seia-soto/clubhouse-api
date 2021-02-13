import agent from '../structures/agent'

const getSuggestedSpeakers = async (profile, channel) => {
  'use strict'

  const response = await agent(
    '/get_suggested_speakers',
    {
      body: {
        channel
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default getSuggestedSpeakers

export const specification = {
  clubs: [], // unknown
  count: Number,
  next: Number,
  previous: Number,
  success: Boolean,
  users: [
    {
      bio: String,
      last_active_minutes: Number,
      name: String,
      photo_url: String,
      twitter: String,
      user_id: Number,
      username: String
    }
  ]
}
