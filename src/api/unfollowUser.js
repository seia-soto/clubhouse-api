import agent from '../structures/agent'

const unfollowUser = async (profile, userId) => {
  'use strict'

  const response = await agent(
    '/unfollow',
    {
      body: {
        user_id: userId || 1
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default unfollowUser

export const specification = {
  success: Boolean
}
