import agent from '../structures/agent'

const getClubsOfTopic = async (profile, opts) => {
  'use strict'

  opts = opts || {}

  const response = await agent(
    '/get_clubs_for_topic',
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

export default getClubsOfTopic

export const specification = {
  clubs: [
    {
      club_id: Number,
      description: String,
      is_follower: Boolean,
      is_member: Boolean,
      name: String,
      num_followers: Number,
      num_members: Number,
      photo_url: String
    }
  ],
  count: Number,
  next: Number,
  previous: Number,
  success: Boolean
}
