import agent from '../structures/agent'

const unblock = async (profile, user) => {
  'use strict'

  const response = await agent(
    '/unblock',
    {
      body: {
        user_id: user || -1
      }
    },
    profile
  )
  const data = await response.json()

  return data
}

export default unblock

export const specification = {
  success: Boolean
}
