import agent from '../structures/agent'

const updateBio = async (profile, bio) => {
  'use strict'

  const response = await agent(
    '/update_bio',
    {
      body: {
        bio: bio || null
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default updateBio

export const specification = {
  success: Boolean
}
